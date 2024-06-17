import {format} from 'date-fns'

export const formatDate = (ISO8601Date: string)=>{
    const date = new Date(ISO8601Date)
    return format(date, 'dd/MM/yyyy')
}