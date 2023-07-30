import { SERVICE_PAGE } from '@/app/constants/textConstants';
import { Li } from '@/components/Li';
import RTONBanner from '@/components/RTONBanner';
import BookAnAppointmentButton from '@/components/ServicePage/BookAnAppointmentButton';
import { ServiceDescription } from '@/components/ServicePage/Description';
import { WhyChoose } from '@/components/ServicePage/WhyChoose';
import { WhyRooton } from '@/components/ServicePage/WhyRooton';
import { ServicePageWrapper } from '@/components/ServicePage/Wrapper';
import { Ul } from '@/components/Ul';

export default function ServicePage() {
  return (
    <>
      <RTONBanner
        backgroundImageUrl="url(https://i.pinimg.com/736x/f5/be/fa/f5befa6a938b0cb3ca40d3b8a1fda28e.jpg)"
        addGradient
        heroText="Open Work Permit"
        description="Explore work opportunities in Canada with our Open Work Permit Service."
        button={<BookAnAppointmentButton />}
      />
      <ServicePageWrapper>
        <>
          <ServiceDescription text={SERVICE_PAGE.description} />
          <WhyChoose
            title="Why Choose Our Open Work Permit Service"
            description="
              With our Open Work Permit Service, you gain the advantage of expert guidance and support throughout the
              application process. We understand the specific requirements and criteria for obtaining an Open Work
              Permit, and we can provide valuable assistance in preparing your application and ensuring compliance
              with immigration regulations. Our goal is to maximize your chances of obtaining a work permit and
              facilitate a successful work experience in Canada.
            "
            imageAlt="A man with laptop"
            imageUrl="/root-on-logo-black.svg"
          />
          <WhyRooton
            title="Why Root On?"
            description="
              What seems impossible to others has been made possible by Root On. We have a successful approval rate of
              more than 70%, considering the fact that a large portion of our clients have complex profiles like - an
              education gap of more than 5-10 years, multiple previous refusals, poor academic backgrounds, inability to
              get admission from above average institutions, etc. Want to know how?
            "
          />
          <Ul>
            <Li>Holding a valid visitor status, student status, or temporary resident permit</Li>
            <Li>Being the spouse or common-law partner of a student or worker in Canada</Li>
            <Li>
              Being an applicant under certain immigration programs, such as the International Experience Canada (IEC)
              program or the Post-Graduation Work Permit (PGWP) program
            </Li>
            <Li>Meeting the language proficiency requirements in English or French, if applicable</Li>
          </Ul>
        </>
      </ServicePageWrapper>
    </>
  );
}
