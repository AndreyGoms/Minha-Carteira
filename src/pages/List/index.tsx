import React,{ useMemo, useState, useEffect }from "react";
import { Container, Content, Filters } from "./styles";
import ContentHeader from "../../Components/ContentHeader";
import SelectInput from "../../Components/SelectInput";
import HistoryFinanceCard from "../../Components/HistoryFinanceCard";
import { useParams } from "react-router-dom";
import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

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
        {value : 7, label : 'Julho'},
        {value : 8, label : 'Agosto'},
        {value : 9, label : 'Setembro'}
    ]

    const years =[
      {value : 2020, label : 2020},
      {value : 2019, label : 2019},
      {value : 2018, label : 2018}
    ]

    useEffect(() => {
      const response = listData.map(item => {
         return {
              id: String(Math.random() * data.length),
              description: item.description,
              amountFormatted: item.amount,
              frquency: item.frequency,
              dateFormatted: item.date,
              tagColor: item.frequency === 'recorrente'?  '#4e41f0' : '#e44c4e'
         }
      })
      setData(response);
    },[])

    return (
      <Container>
          <ContentHeader title={prop.title} lineColor={prop.lineColor}>
            <SelectInput options={months}/>
            <SelectInput options={years}/>

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