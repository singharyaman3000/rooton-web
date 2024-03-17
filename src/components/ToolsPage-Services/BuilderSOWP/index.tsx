/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

import React, { useState, useEffect, useRef } from 'react';
import Form from './Form';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import { FormSection } from '@/app/services/apiService/ToolsAPI';
import DataBuilder from '../DataBuilder';

const Home: React.FC<{ response: any }> = ({ response }: any) => {
  const [formFields, setFormFields] = useState<FormSection[]>([]);
  const [generatedText, setGeneratedText] = useState('');
  const [key, setKey] = useState(0);
  const chatGPTRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [systemPrompt, setSystemPrompt] = useState('');

  useEffect(() => {
    const data = response.data.attributes.tools_contents.data[0].attributes.json_content;
    setFormFields(data);
  }, []);

  const handleFormSubmit = (formData: Record<string, string>) => {
    const userprompt = formFields
      .map((section) => {
        setSystemPrompt(section.prompt);
        return `${section.userPrompt} \n\n${section.builder
          .map((subSection) => {
            return `${subSection.title} paragraph;\n${subSection.fields
              .map((field) => {
                if (formData[field.name]) {
                  return `${field.label}: ${formData[field.name]}`;
                }
                return '';
              })
              .filter(Boolean)
              .join(',\n')}`;
          })
          .join(',\n\n')}`;
      })
      .join('\n\n');

    setGeneratedText(userprompt);
    setKey((prevKey) => {
      return prevKey + 1;
    });
  };

  useEffect(() => {
    if (generatedText && chatGPTRef.current) {
      chatGPTRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [generatedText]);

  return (
    <div>
      <div className="min-h-screen">
        {formFields.length > 0 && (
          <div className="md:max-w-[70%] xl:max-w-none px-[24px] md:px-[48px] lg:px-[80px] mt-5">
            <SectionHeadings title={formFields[0].builderTitle} subTitle={formFields[0].builderSubTitle} />
          </div>
        )}
        {formFields && Object.keys(formFields).length > 0 && (
          <div ref={formRef} className="block p-5 lg:px-[80px] mt-5 m-auto max-w-screen-2k">
            <Form formFields={formFields} onFormSubmit={handleFormSubmit} />
          </div>
        )}
        {generatedText && (
          <div ref={chatGPTRef} className="block p-5 lg:px-[80px] mt-5 m-auto max-w-screen-2k">
            <DataBuilder key={key} systemPrompt={systemPrompt} userprompt={generatedText} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
