import React from "react";
import ContentHeader from "../../Components/ContentHeader";
import SelectInput from "../../Components/SelectInput";
import { Container } from "./styles";

const Dashboard : React.FC = () => {
    const options =[
        {value : 'Jorge', label : 'Jorge'},
        {value : 'Mario', label : 'Mario'},
        {value : 'Joao', label : 'Joao'}
    ]

    return (
        <Container>
           <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={options}/>
           </ContentHeader>
        </Container>
    );
}

export default Dashboard;