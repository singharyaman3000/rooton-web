import RTONBanner from '@/components/RTONBanner';
import BookAnAppointmentButton from '@/components/ServicePage/BookAnAppointmentButton';

export default function ServicePage() {
  return (
    <RTONBanner
      backgroundImageUrl="url(https://i.pinimg.com/736x/f5/be/fa/f5befa6a938b0cb3ca40d3b8a1fda28e.jpg)"
      addGradient
      heroText="Open Work Permit"
      description="Explore work opportunities in Canada with our Open Work Permit Service."
      button={<BookAnAppointmentButton />}
    />
  );
}
