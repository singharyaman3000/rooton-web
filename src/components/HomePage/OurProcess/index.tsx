import SectionContainer from '@/components/Containers/SectionContainers'
import SectionHeadings from '@/components/UIElements/SectionHeadings'
import React from 'react'
import { ITitleAttributes } from '../ServicesListing/interafces'
import Processes, { IOurProcessData } from './Processes'

export interface IOurProcess extends ITitleAttributes {
    json_content : IOurProcessData
}


const OurProcess = ({title , sub_title , json_content}:IOurProcess) => {
  return (
<SectionContainer>
    <SectionHeadings title={title} subTitle={sub_title} />
    <Processes process={json_content.process}/>
</SectionContainer>
  )
}

export default OurProcess