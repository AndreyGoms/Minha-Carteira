import React from "react";
import { Container, Content, Filters } from "./styles";
import ContentHeader from "../../Components/ContentHeader";
import SelectInput from "../../Components/SelectInput";
import HistoryFinanceCard from "../../Components/HistoryFinanceCard";

const List : React.FC = () => {

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

    return (
      <Container>
          <ContentHeader title="Saídas" lineColor="#E44C4E">
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
            <HistoryFinanceCard              
              tagColor="#e44c4e"
              title="conta de luz"
              subtitle="27/10/2024"
              amount="R$ 130,00"
            />

          </Content>
      </Container>
    );
}

export default List;