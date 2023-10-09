import { ISubServicesContent } from '@/app/services/apiService/serviceAPI';
import OurProcess from '@/components/HomePage/OurProcess';
import { IOurProcessData } from '@/components/HomePage/OurProcess/interfaces';

type ProcessSectionProps = {
    process?: ISubServicesContent;
}

const ProcessSection = ({ process }: ProcessSectionProps) => {
  if (process && process?.attributes?.json_content) {
    return (
      <div className=" mt-20 m-auto max-w-screen-2k">
        <OurProcess
          className=" !py-0"
          title={''}
          sub_title={process?.attributes?.title ?? ''}
          json_content={process?.attributes?.json_content as IOurProcessData}
        />
      </div>
    );
  }

  return null;
};

export default ProcessSection;
