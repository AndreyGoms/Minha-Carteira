import React from "react";
import { Container } from "./styles"


interface IMessageBoxProps {
    title: string;
    description: string;
    footerText: string;
    icon: string;
}

// const MessageBox : React.FC<IMessageBoxProps> = ({
//     title,
//     description,
//     footerText,
//     icon}
// ) => {
//     return (
//         <Container>
//            <header>
//                 <h1>
//                     {title} <img src={icon} alt={title}/>
//                 </h1>
//                 <p>{description}</p>
//            </header>

//            <footer>
//                  <span>{footerText}</span>
//            </footer> 
//         </Container>
//     );
// }

const MessageBox = (props:IMessageBoxProps) => {
    
    return (
        <Container>
           <header>
                <h1>
                    {props.title} <img src={props.icon} alt={props.title}/>
                </h1>
                <p>{props.description}</p>
           </header>

           <footer>
                 <span>{props.footerText}</span>
           </footer> 
        </Container>
    );
}

export default MessageBox;