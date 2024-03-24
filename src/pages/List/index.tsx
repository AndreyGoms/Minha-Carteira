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
import listOfMonths from "../../utils/months";

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
  const [selectedFrequency, setSelectedFrequency] = useState(['recorrente','eventual']);
  
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

    const years = useMemo(() => {
      let uniqueYears: number[] = [];

      listData.forEach(item => {
        const date = new Date(item.date);
        const year = date.getFullYear();

        if(!uniqueYears.includes(year)){
          uniqueYears.push(year);
        }
      });

      return uniqueYears.map(year => {
        return {
          value: year,
          label: year,
        }
      })
    },[listData]);

    const months = useMemo(() => {
      return listOfMonths.map((month, index) => {
        return {
          value: index + 1,
          label: month
        }
      })

    },[]);

    const handleFrequencyClick = (frequency: string) => {
      const alreadySelected = selectedFrequency.findIndex(item => item === frequency)
      
      if(alreadySelected >= 0) {
        const filtered = selectedFrequency.filter(item => item !== frequency);
        setSelectedFrequency(filtered);
                
      } else {        
        setSelectedFrequency((prev) => [...prev, frequency]);
        
      }
    }

    useEffect(() => {

      const filteredData = listData.filter(item => {

         const date = new Date(item.date); 
                  
         const month = String(date.getMonth() + 1);
         const year = String(date.getFullYear());

         return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
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
    },[listData, monthSelected, yearSelected, data.length, selectedFrequency])
    

    return (
      <Container>
          <ContentHeader title={prop.title} lineColor={prop.lineColor}>
            <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected}/>
            <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>

          </ContentHeader>

          <Filters>
              <button
                type="button"
                className={`tag-filter tag-filter-recurrent
                ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
                onClick={() => handleFrequencyClick('recorrente')}
                >
                  Recorrentes
              </button>  
              <button
                type="button"
                className={`tag-filter tag-filter-eventual
                ${selectedFrequency.includes('eventual') && 'tag-actived'}`}                
                onClick={() => handleFrequencyClick('eventual')}
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