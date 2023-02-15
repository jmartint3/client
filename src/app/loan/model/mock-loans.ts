import { LoanPage } from "./LoanPage";

export const LOAN_DATA: LoanPage = {
    content: [
        {id: 1, clientName: 'Eric', gameName: 'On Mars', initialDate: new Date(2023, 1, 17), finalDate: new Date(2023, 2, 3)},
        {id: 2, clientName: 'Pau', gameName: 'Aventureros al tren', initialDate: new Date(2022, 12, 13), finalDate: new Date(2022, 12, 23)},
        {id: 3, clientName: 'Jordi', gameName: 'Aventureros al tren', initialDate: new Date(2022, 11, 17), finalDate: new Date(2022, 11, 23)},
        {id: 4, clientName: 'Gonzalo', gameName: 'On Mars', initialDate: new Date(2022, 11, 17), finalDate: new Date(2022, 11, 23)},
        {id: 5, clientName: 'Pauper', gameName: 'Los viajes de Marco Polo', initialDate: new Date(2023, 1, 17), finalDate: new Date(2023, 2, 3)},
        {id: 6, clientName: 'Barxino', gameName: '1920: Wall Street', initialDate: new Date(2023, 1, 17), finalDate: new Date(2023, 2, 3)},
        {id: 7, clientName: 'Jorro', gameName: 'On Mars', initialDate: new Date(2021, 1, 17), finalDate: new Date(2021, 2, 3)},
        {id: 8, clientName: 'Eric', gameName: 'Barrage', initialDate: new Date(2023, 1, 17), finalDate: new Date(2023, 2, 3)},
        {id: 9, clientName: 'Pablo', gameName: 'Azul', initialDate: new Date(2023, 1, 17), finalDate: new Date(2023, 2, 3)},
        {id: 10, clientName: 'Pablo', gameName: 'Barrage', initialDate: new Date(2021, 1, 17), finalDate: new Date(2021, 2, 3)}
    ],  
    pageable : {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            {property: "id", direction: "ASC"}
        ]
    },
    totalElements: 7
}