const SocialSection = () => {
  const p1 =
    'In recent years, social media has enhanced the work of our real estate agents, that are now able to showcase the properties they represent on multiple channels.';
  const p2 =
    'Be the first to find out about the most recent estates we are renting and/or selling and follow is on social media!.';

  return (
    <section className="flex px-6 lg:px-0">
      <div className="text-sm lg:text-base pt-[68px] pb-[51px]">
        <h2 className="text-[28px] lg:text-[40px] mb-10 font-extrabold">{"Let's be social"}</h2>
        <div></div>
        <p>{p1 + p2}</p>
      </div>
      {/* Form section */}
      <div></div>
    </section>
  );
};

export default SocialSection;
