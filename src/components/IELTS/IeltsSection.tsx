// pages/ielts.tsx

import React, { useState } from 'react';

const IELTSPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General Training');

  const tabs = ['General Training', 'Academic Training'];
  const sections = [
    {
      title: 'Listening',
      contentGeneral: 'You will listen to four recordings of native English speakers and then respond to a series of questions in writing. Assessors will be looking for evidence of your ability to grasp the major concepts and detailed factual information, the viewpoints and attitudes of speakers, the goal of an utterance, and the evolution of ideas.',
      contentAcademic: 'You will listen to four recordings of native English speakers and then respond to a series of questions in writing. Assessors will be looking for evidence of your ability to grasp the major concepts and detailed factual information, the viewpoints and attitudes of speakers, the goal of an utterance, and the evolution of ideas.',
    },
    {
      title: 'Reading',
      contentGeneral: 'This part is intended to assess a wide variety of reading abilities. It contains excerpts from books, periodicals, and newspapers, as well as announcements, advertising, and business handbooks and standards. These are the kinds of resources you are likely to come across on a regular basis in an English-speaking setting.',
      contentAcademic: 'This part is intended to assess a wide variety of reading abilities. It contains excerpts from books, periodicals, and newspapers, as well as announcements, advertising, and business handbooks and standards. These are the kinds of resources you are likely to come across on a regular basis in an English-speaking setting.',
    },
    {
      title: 'Writing',
      contentGeneral: 'There are two tasks. First, you will be presented with a situation and asked to write a letter requesting information, or explaining the situation. The letter may be personal, semi-formal or formal in style. Then, you will be asked to write an essay in response to a point of view, argument or problem. The essay can be fairly personal in style.',
      contentAcademic: 'There are two tasks. First, you will be presented with a situation and asked to write a letter requesting information, or explaining the situation. The letter may be personal, semi-formal or formal in style. Then, you will be asked to write an essay in response to a point of view, argument or problem. The essay can be fairly personal in style.',
    },
    {
      title: 'Speaking',
      contentGeneral: 'This section is divided into three parts. The examiner will ask broad questions about you and a variety of common themes such home, family, employment, studies, and interests. In the next section, you will be handed a card with a question on it. The examiner will next ask a series of questions on the same subject.',
      contentAcademic: 'This section is divided into three parts. The examiner will ask broad questions about you and a variety of common themes such home, family, employment, studies, and interests. In the next section, you will be handed a card with a question on it. The examiner will next ask a series of questions on the same subject.',
    },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px' }}>IELTS Sections</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '700px' }}>
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabClick(tab)}
            style={{
              flex: 1,
              cursor: 'pointer',
              padding: '10px',
              textAlign: 'center',
              backgroundColor: activeTab === tab ? '#0077b6' : '#333',
              color: 'white',
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Responsive grid layout
          gridGap: '20px',
          maxWidth: '1200px',
          margin: '20px',
        }}
      >
        {sections.map((section) => (
          <div key={section.title} style={{ padding: '10px', textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', paddingBottom: '15px' }}>{section.title}</h2>
            <p style={{ fontSize: '15px', textAlign: 'justify', padding: '5px 10px' }}>
              {activeTab === 'General Training' ? section.contentGeneral : section.contentAcademic}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IELTSPage;
