import React,{ useMemo, useState, useEffect }from "react";
import { Container, Content, Filters } from "./styles";
import ContentHeader from "../../Components/ContentHeader";
import SelectInput from "../../Components/SelectInput";
import HistoryFinanceCard from "../../Components/HistoryFinanceCard";
import { useParams } from "react-router-dom";
import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency"; 
import formatDate from "../../utils/formatDate";

interface IData {
  id: string;
  description: string;
  amountFormatted: string; 
  frquency: string;
  dateFormatted: string;
  tagColor: string;
}

const List : React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const { type } = useParams<{type: string}>();
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
  
  const prop = useMemo(() => {
      return type === "entry-balance" ? {
        title: 'Entradas',
        lineColor: '#F7931B'
      }: {
        title: 'Saídas',
        lineColor: '#E44C4E'
      }

    },[type])

    const listData = useMemo(() => {
      return type === "entry-balance" ? gains : expenses
    },[type])

    const months =[
        {value : 1, label : 'Janeiro'},
        {value : 5, label : 'Maio'},
        {value : 3, label : 'Março'}
    ]

    const years =[
      {value : 2020, label : 2020},
      {value : 2019, label : 2019},
      {value : 2024, label : 2024}
    ]


    useEffect(() => {

      const filteredData = listData.filter(item => {

         const date = new Date(item.date); 
                  
         const month = String(date.getMonth() + 1);
         const year = String(date.getFullYear());

         return month === monthSelected && year === yearSelected;
      });

      const formattedData = filteredData.map(item => {
          return {
              id: String(new Date().getTime()) + item.amount,
              description: item.description,
              amountFormatted: formatCurrency(Number(item.amount)),
              frquency: item.frequency,
              dateFormatted: formatDate(item.date),
              tagColor: item.frequency === 'recorrente'?  '#4e41f0' : '#e44c4e'
          }
      })
      
      setData(formattedData);
    },[listData, monthSelected, yearSelected, data.length])

    return (
      <Container>
          <ContentHeader title={prop.title} lineColor={prop.lineColor}>
            <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected}/>
            <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>

          </ContentHeader>

          <Filters>
              <button
                type="button"
                className="tag-filter tag-filter-recurrent"
                >
                  Recorrentes
              </button>  
              <button
                type="button"
                className="tag-filter tag-filter-eventual"
                >
                  Eventuais
              </button>  
          </Filters>

          <Content>
            { 
              data.map(item => (
                  <HistoryFinanceCard
                    key={item.id}
                    tagColor={item.tagColor}
                    title={item.description}
                    subtitle={item.dateFormatted}
                    amount={item.amountFormatted}
                  />
              ))
            }

          </Content>
      </Container>
    );
}

export default List;