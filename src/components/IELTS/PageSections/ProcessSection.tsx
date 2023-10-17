import OurProcess from '@/components/HomePage/OurProcess';
import { IOurProcessData } from '@/components/HomePage/OurProcess/interfaces';

interface IProcess {
  title: string;
  position: string;
  description: string;
}

const processes: IOurProcessData = {
  process: [
    {
      title: 'Step 1',
      position: '1',
      description: 'Go to the official website for IELTS in India. https://www.ieltsidpindia.com/',
    },
    {
      title: 'Step 2',
      position: '2',
      description: 'Select your test type and then select the available test date and test city',
    },
    {
      title: 'Step 3',
      position: '3',
      description: 'Complete the online application form',
    },
    {
      title: 'Step 4',
      position: '4',
      description: 'Pay the test fee by credit card',
    },
    {
      title: 'Step 5',
      position: '5',
      description: 'Get instant seat booking and acknowledgement',
    },
  ],
};

const ProcessSection = () => {
  return (
    <div className=" mt-20 m-auto max-w-screen-2k">
      <OurProcess
        className=" !py-0"
        title={''}
        sub_title={'Our Process'}
        json_content={processes}
      />
    </div>
  );
};

export default ProcessSection;
