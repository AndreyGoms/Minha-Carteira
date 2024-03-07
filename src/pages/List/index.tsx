import React from "react";
import { Container } from "./styles";
import ContentHeader from "../../Components/ContentHeader";
import SelectInput from "../../Components/SelectInput";

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
      </Container>
    );
}

export default List;