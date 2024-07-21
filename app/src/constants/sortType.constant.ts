import {faArrowUpWideShort, faArrowDownWideShort, faArrowsUpDown} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";

export interface SortType{
    [key: string]: {
        serverValue: string,
        label: string,
        iconDefinition: IconDefinition
    }
}

export const SortTypeConstant: SortType = {
    relevant: {
        serverValue: "relevant",
        label: "Liên quan nhất",
        iconDefinition: faArrowsUpDown
    },
    asc: {
        serverValue: "asc",
        label: 'Giá từ thấp đến cao',
        iconDefinition: faArrowUpWideShort
    },
    desc: {
        serverValue: "desc",
        label: 'Giá từ cao đén thấp',
        iconDefinition: faArrowDownWideShort
    }
}