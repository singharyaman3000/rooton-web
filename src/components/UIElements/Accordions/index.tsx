import React from 'react'

interface IAccordion {
    header : React.ReactNode,

}

const Accordion = ({header}:IAccordion) => {
  return (
    <div>
        <div className='p-[18px] flex items-center'>
            <div>
                {header}
            </div>

        </div>

    </div>
  )
}

export default Accordion