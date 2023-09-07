import { Ul } from '@/components/Ul';
import { WhyRooton } from '../WhyRooton';
import { Li } from '@/components/Li';
import RTONButtonBlackThemed from '@/components/RTONButtonBlackThemed';
import CalenderIconYellow from '@/components/Icons/CalendarIconYellow';
import { ISubServicesContent } from '@/app/services/apiService/serviceAPI';

type EligibilitySectionProps = {
  eligibility?: ISubServicesContent;
  handleCTAButtonClick: () => void;
};

const EligibilitySection = ({ eligibility, handleCTAButtonClick }: EligibilitySectionProps) => {
  if (eligibility && eligibility?.attributes?.json_content?.eligibility) {
    return (
      <>
        <WhyRooton
          title={eligibility?.attributes.title ?? ''}
          description={eligibility?.attributes.description ?? ''}
        />
        <Ul>
          {(eligibility?.attributes.json_content.eligibility ?? []).map((e) => {
            return (
              <Li key={e.position + e.key}>
                <>
                  <p className={`${e.description && ' font-bold'}`}>{e.title}</p>
                  {e.description &&
                    (e.description as string[]).map((des) => {
                      return (
                        <Li className=' font-normal' tabbed key={`${e.position + e.key + des}-child`}>
                          {' '}
                          {des}{' '}
                        </Li>
                      );
                    })}
                </>
              </Li>
            );
          })}
        </Ul>
        <div className=" mt-10 w-full md:w-[232px]">
          <RTONButtonBlackThemed
            onClick={handleCTAButtonClick}
            ariaLabel="Get your queries solved"
            text="Get your queries solved"
            icon={<CalenderIconYellow />}
            className=" w-full"
          />
        </div>
      </>
    );
  }

  return null;
};

export default EligibilitySection;
