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
  const { movimentType } = useParams<{movimentType: string}>();
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
  const [selectedFrequency, setSelectedFrequency] = useState(['recorrente','eventual']);
  
    const pageData = useMemo(() => {
            
      return movimentType === "entry-balance"?
      {
        title: 'Entradas',
        lineColor: '#4E41F0',
        data: gains
      } : 
      {
        title: 'Saídas',
        lineColor: '#E44C4E',
        data: expenses
      }

    },[movimentType]);


    const years = useMemo(() => {
      let uniqueYears: number[] = [];
      
      pageData.data.forEach(item => {
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
    },[pageData.data]);

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

    const handleMonthSelected = (month : string) => {
      try {
        const parseMonth = Number(month);
        setMonthSelected(parseMonth);        
      } catch (error) {
        throw new Error("Invalid month value. Is accpet 0 - 24");
      }
    }
    const handleYearSelected = (year : string) => {
      try {
        const parseYear = Number(year);
        setYearSelected(parseYear);    
      } catch (error) {
        throw new Error("Invalid year value.");
      }
    }

    useEffect(() => {

      const filteredData = pageData.data.filter(item => {

         const date = new Date(item.date); 
                  
         const month = date.getMonth() + 1;
         const year = date.getFullYear();

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
    },[pageData.data, monthSelected, yearSelected, data.length, selectedFrequency])
    

    return (
      <Container>
          <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
            <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
            <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>

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