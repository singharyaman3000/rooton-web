'use client';

import { useState } from 'react';

interface PricingTabProps {
  yearly: boolean;
  popular?: boolean;
  planName: string;
  price: number;
  planDescription: string;
  validity: string;
  features: string[][];
}

function PricingTab(props: PricingTabProps) {
  const [expanded, setExpanded] = useState<boolean[]>(props.features.map(() => false));

  return (
    <div className="h-full">
      <div className="relative flex flex-col h-full p-6 rounded-2xl shadow-xl border border-slate-300">
        {props.popular && (
          <div className="absolute top-0 right-0 mr-6 -mt-4">
            <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-[#f59723] text-white rounded-full shadow-sm shadow-slate-950/5">
              Most Popular
            </div>
          </div>
        )}
        <div className="mb-5">
          <div className="text-black text-center font-extrabold mb-5 text-2xl">{props.planName}</div>
          <div className="flex items-center justify-center items-baseline mb-5">
            <div className="text-black font-bold text-4xl">${props.price}</div>
          </div>
          <div className="text-sm text-black mb-5">{props.planDescription}</div>
          <a
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#f59723] px-3.5 py-3 text-[17px] font-bold text-white hover:bg-[#F7AC50] focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
            href="#0">
            Purchase Plan
          </a>
        </div>
        <div className="text-black font-medium font-semibold mb-3">Validity: {props.validity}</div>
        <div className="text-black font-medium mb-3">Includes:</div>
        <ul className="text-black text-sm space-y-3 grow">
          {props.features.map((feature, index) => {
            const isExpanded = expanded[index];
            const subFeatures = feature.slice(1);

            return (
              <li key={index} className="flex flex-col text-base font-medium cursor-pointer" onClick={() => {
                const newExpanded = [...expanded];
                newExpanded[index] = !isExpanded;
                setExpanded(newExpanded);
              }}>
                <div className="flex items-center">
                  <svg
                    className={`w-4 h-4.5 fill-{#333333} mr-2 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      const newExpanded = [...expanded];
                      newExpanded[index] = !isExpanded;
                      setExpanded(newExpanded);
                    }}
                  >
                   <path d="M2.293 4.293a1 1 0 011.414 0L6 6.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                  </svg>
                  <span>{feature[0]}</span>
                </div>
                {isExpanded && (
                  <ul className="text-black text-sm space-y-4 grow ml-5 font-normal">
                    {subFeatures.map((subFeature, subIndex) => (
                      <li key={subIndex} className="flex items-center">
                        <svg
                          className="w-2 h-2 text-emerald-500 mr-3 shrink-0"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="10" cy="10" r="8" fill="currentColor" />
                        </svg>
                        <div>{subFeature}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function PricingTable() {
  const [yearly, setYearly] = useState<boolean>(true);

  return (
    <div className="mt-20 m-auto max-w-screen-2k">
    <div className="px-[24px] md:px-[48px] lg:px-[80px]   !py-0 pt-10 md:pt-[100px] fgx">
            <h4 className="max-w-[340px] md:max-w-none mb-10 md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem] undefined">
                Our Plans</h4>
      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 items-start lg:max-w-none">
        {/* Pricing tab 1 */}
        <PricingTab
          yearly={yearly}
          planName="IELTS My Pace"
          price={29}
          validity="90 days"
          planDescription="For students who wish to learn IELTS at their own speed and at their own time convenience."
          features={[
            [
              'Suitable for those:',
              'Who wish to study at their own pace.',
              'Learners willing to have the freedom to progress at their own speed.',
              'Independent learners.',
            ],
            [
              'Course Overview:',
              'Individual Practice tests for different modules.',
              'Grammar for IELTS.',
              'Cover all sections in detail.',
              'Access to full-length mock tests.',
              'Special review for Speaking and Writing.',
            ],
            [
              'Course Outline:',
              'IELTS Introduction - Course Structure and Orientation',
              'IELTS listening - Sentence completion, Form completion, Mock tests, etc.',
              'IELTS Reading-List of headings, Yes/No questions, etc.',
              'IELTS Writing - Essay - Advantage, Disadvantage, Data, graphs, etc.',
              'IELTS Speaking. - Speaking overview, Part 1, 2, 3, etc.',
            ],
          ]}
        />

        {/* Pricing tab 2 */}
        <PricingTab
          yearly={yearly}
          popular={true}
          planName="IELTS A la Carte"
          price={39}
          validity="Based on chosen modules"
          planDescription="A customized solution for students who want to focus on specific areas of weakness in the IELTS examination"
          features={[
            [
              'Suitable for:',
              'Students who need targeted practice in one or more IELTS modules.',
              'Those who have already prepared for IELTS but need to enhance specific modules.',
              'Independent learners who prefer a self-guided approach, with the option for live coaching in chosen modules.',
            ],
            [
              'Course Overview:',
              'Targeted practice tests and exercises for specific modules.',
              'Access to detailed study materials for chosen areas.',
              'Option for personalized feedback and coaching.',
              'Flexibility to select one or multiple modules.',
            ],
            [
              'Course Outline (Choose any or all):',
              'IELTS Listening: Practice tests, Specific Listening Challenges, Tailored Exercises.',
              'IELTS Reading: Focus on Headings, Specific Reading Strategies, Targeted Practice.',
              'IELTS Writing: Customized Writing Tasks, Feedback on Essays, Graphs, and Letters.',
              'IELTS Speaking: Personalized Speaking Tasks, Individualized Feedback, Intensive Practice.',
            ],
            [
              'Course Options:',
              'Online Self-Study Course: Access to individual module materials for focused self-study.',
              'Live Online Coaching: Tailored coaching sessions for personalized guidance in chosen modules.',
            ],
          ]}
        />

        {/* Pricing tab 3 */}
        <PricingTab
          yearly={yearly}
          planName="IELTS Velocity"
          price={49}
          validity="30 days"
          planDescription="Designed for those who want to fast-track their IELTS preparation."
          features={[
            [
              'Suitable for:',
              'Students who need to prepare for the IELTS exam in a short time.',
              'Individuals who need to focus intensely on their weak areas.',
              'Those who prefer a structured, high-intensity approach.',
            ],
            [
              'Course Overview:',
              'Fast-paced learning through rigorous practice sessions.',
              'Tailored strategies and techniques to quickly improve in targeted areas.',
              'Access to one-on-one coaching with experienced instructors.',
              'High-intensity mock tests with real-time feedback.',
              'Specially designed materials to enhance all four IELTS skills quickly.',
            ],
            [
              'Course Outline:',
              'IELTS Acceleration: Overview, Strategies, and Techniques.',
              'IELTS Listening: Speed Listening Exercises, Quick Comprehension Techniques, High-Intensity Mock Tests.',
              'IELTS Reading: Skimming and Scanning Practices, Fast Reading Techniques.',
              'IELTS Writing: Rapid Essay Writing, Quick Responses to Graphs and Data.',
              'IELTS Speaking: Accelerated Speaking Practices, Intensive Part 1, 2, 3 Training.',
            ],
          ]}
        />

        {/* Pricing tab 4 */}
        <PricingTab
          yearly={yearly}
          planName="IELTS E-learning"
          price={40}
          validity="90 days"
          planDescription="For students who wish to learn IELTS from comfort of their home."
          features={[
            [
              'Suitable for those:',
              'Who wish to study at their own pace.',
              'Learners willing to have the freedom to progress at their own speed.',
              'Independent learners.',
            ],
            [
              'Course Overview:',
              'Individual Practice tests for different modules.',
              'Grammar for IELTS.',
              'Cover all sections in detail.',
              'Access to full-length mock tests.',
              'Special review for Speaking and Writing.',
            ],
            [
              'Course Outline:',
              'IELTS Introduction - Course Structure and Orientation',
              'IELTS listening - Sentence completion, Form completion, Mock tests, etc.',
              'IELTS Reading-List of headings, Yes/No questions, etc.',
              'IELTS Writing - Essay - Advantage, Disadvantage, Data, graphs, etc.',
              'IELTS Speaking. - Speaking overview, Part 1, 2, 3, etc.',
            ],
          ]}
        />

      </div>
    </div>
    </div>
  );
}
