import { IBlogContentData } from '@/app/services/apiService/blogDetailAPI';

const NavigationPanel = ({ content }: { content: IBlogContentData[] }) => {
  console.log('-----------', content);

  return (
    <div className="w-[600px] h-full px-20 bg-slate-300 flex items-center justify-center">
      <div className="fixed top-[25%]">
        <h3 className="font-bold text-xl mb-5">In this article</h3>
        <nav className="flex flex-col gap-5">
          {content.map(({ id, attributes }) => {
            return (
              <a key={id} href={`#position-${id}`} className="max-w-[320px] hover:font-bold">
                {attributes.title}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavigationPanel;
