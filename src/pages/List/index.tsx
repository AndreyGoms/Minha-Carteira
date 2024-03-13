import React from "react";
import { Container, Content } from "./styles";
import ContentHeader from "../../Components/ContentHeader";
import SelectInput from "../../Components/SelectInput";
import HistoryFinanceCard from "../../Components/HistoryFinanceCard";

const List : React.FC = () => {

    const options =[
        {value : 'Jorge', label : 'Jorge'},
        {value : 'Mario', label : 'Mario'},
        {value : 'Joao', label : 'Joao'}
    ]

    return (
      <Container>
          <ContentHeader title="Saídas" lineColor="#E44C4E">
            <SelectInput options={options}/>
          </ContentHeader>

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