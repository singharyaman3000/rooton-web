/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-cond-assign */
import React, { useEffect, useRef, useState } from 'react';
import { jsPDF as JsPDF } from 'jspdf';
import { AlignmentType, Document, Packer, Paragraph, TextRun } from 'docx';
import ReactMarkdown from 'react-markdown';
import PDFIcon from '../Icons/PDFIcon';
import WordIcon from '../Icons/WordIcon';
import StepperPopup from './Feedback';
import { useHeaderData } from '@/hooks/HeaderDataProvider';

interface TypingEffectProps {
  text: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  const htmlContentRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [fileType, setFileType] = useState<'pdf' | 'docx' | null>(null);
  const { updateToolsFormState } = useHeaderData();

  const portalId = '7535538';
  const formId = 'c4d218bc-6b53-4471-af8a-23dec8e26ab7';
  const region = 'na1';
  const target = 'LeadForm';

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prevIndex) => {
          return prevIndex + 1;
        });
      }
      if (currentIndex === text.length) {
        updateToolsFormState(false);
      }
    }, 5);

    return () => {
      return clearInterval(typingInterval);
    };
  }, [text, currentIndex, updateToolsFormState]);

  const generatePDF = () => {
    const doc = new JsPDF();
    doc.setFont('helvetica', 'normal');
    const fontSize = 12;
    doc.setFontSize(fontSize);
    let y = 12;
    const lineHeight = 8;
    const headingExtraSpacing = 4;

    // Function to parse and apply styles to Markdown text
    const parseAndStyleText = (markedText: string) => {
      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;

      // Function to add spacing for headings
      const addHeadingSpace = (isHeading: boolean) => {
        if (isHeading) {
          y += headingExtraSpacing; // Add extra space before the heading
        }
      };

      // Iterate over all bold matches
      while ((match = boldRegex.exec(markedText)) !== null) {
        // Determine if the bold text should be treated as a heading
        const isHeading =
          (lastIndex === 0 || text[lastIndex - 1] === '\n') && (match.index === 0 || text[match.index - 1] === ' ');
        // Add normal text before bold text
        const normalText = markedText.substring(lastIndex, match.index);
        if (normalText) {
          doc.setFont('helvetica', 'normal');
          doc.text(normalText, 10, y);
          y += lineHeight; // Adjust y position for multiline support
        }

        addHeadingSpace(isHeading); // Add extra spacing if it's a heading

        // Add bold text
        const boldText = match[1];
        if (boldText) {
          doc.setFont('helvetica', 'bold');
          doc.text(boldText, 10, y);
          y += lineHeight; // Adjust y position for multiline support
        }

        lastIndex = match.index + match[0].length;
      }

      // Add any remaining normal text
      const remainingText = markedText.substring(lastIndex);
      if (remainingText) {
        doc.setFont('helvetica', 'normal');
        doc.text(remainingText, 10, y);
        y += lineHeight; // Adjust y position for multiline support
      }
    };

    // Split the typedText into lines considering the page width
    const lines = doc.splitTextToSize(text, 190);

    // Iterate over each line and apply styles
    lines.forEach((line: string) => {
      if (y > 280) {
        // Check if we need a new page
        doc.addPage();
        y = 10;
      }

      parseAndStyleText(line); // Parse and style the current line
    });

    doc.save('Document.pdf');
  };

  const parseMarkdownToFormattedParagraphs = (markdownText: string) => {
    // Split the input text at each newline to ensure they start on a new line in the document
    const lines = markdownText.split('\n');
    const paragraphs: any = [];

    lines.forEach((line) => {
      let Index = 0;
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;
      let isLineEmpty = true;

      while ((match = boldRegex.exec(line)) !== null) {
        // Text before the bold segment, trimmed for leading/trailing whitespace
        const textBefore = line.slice(Index, match.index).trim();
        if (textBefore) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: textBefore,
                  size: 24, // Docx uses half-points, so 12pt = 24 half-points
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                line: 360, // Sets line spacing to 1.5
              },
            }),
          );
          isLineEmpty = false;
        }

        // Bold text
        const boldText = match[1];
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: boldText,
                bold: true,
                size: 24, // Adjusting for bold text as well
              }),
            ],
            spacing: {
              line: 180,
            },
            alignment: AlignmentType.JUSTIFIED,
          }),
        );

        Index = match.index + match[0].length;
        isLineEmpty = false;
      }

      // Remaining text after the last match, trimmed for leading/trailing whitespace
      const remainingText = line.slice(Index).trim();
      if (remainingText || isLineEmpty) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: remainingText || ' ',
                size: 24,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              line: 360, // Ensure line spacing is consistent across paragraphs
            },
          }),
        );
      }
    });

    return paragraphs;
  };

  // Function to generate a Word document from Markdown text, including new formatting
  const generateWordDocument = async () => {
    const paragraphs = parseMarkdownToFormattedParagraphs(text);

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    // Generate a blob for the Word document
    const blob = await Packer.toBlob(doc);

    // Example of how to trigger a download of the document
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Document.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleFileDownload = () => {
    if (fileType === 'pdf') {
      generatePDF();
    } else if (fileType === 'docx') {
      generateWordDocument();
    }
    // Reset after download
    setFileType(null);
    setShowFeedback(false);
  };

  const handleFileDownloadWithoutFeedback = (type: string) => {
    if (type === 'pdf') {
      generatePDF();
    } else if (type === 'docx') {
      generateWordDocument();
    }
  };

  return (
    <div>
      <div className="w-full h-screen">
        {currentIndex === text.length && (
          <div className="flex justify-end mb-2 mr-2">
            <div
              data-tooltip
              onClick={() => {
                const feedback = localStorage.getItem('feedback');
                if (feedback === 'Filled') {
                  handleFileDownloadWithoutFeedback('pdf');
                } else {
                  setShowFeedback(true);
                  setFileType('pdf');
                }
              }}
              aria-label="Download as PDF"
              className="relative cursor-pointer mr-4"
            >
              <PDFIcon />
            </div>
            <div
              data-tooltip
              onClick={() => {
                const feedback = localStorage.getItem('feedback');
                if (feedback === 'Filled') {
                  handleFileDownloadWithoutFeedback('docx');
                } else {
                  setShowFeedback(true);
                  setFileType('docx');
                }
              }}
              aria-label="Download as Document"
              className="relative cursor-pointer"
            >
              <WordIcon />
            </div>
          </div>
        )}
        <div ref={htmlContentRef}>
          <ReactMarkdown className="w-full h-screen border border-golden-yellow p-2 leading-8 overflow-auto text-justify">
            {typedText}
          </ReactMarkdown>
        </div>
      </div>
      <StepperPopup
        isOpen={showFeedback}
        onRequestClose={() => {
          return setShowFeedback(false);
        }}
        onFormSubmit={() => {
          handleFileDownload();
        }}
        portalId={portalId}
        formId={formId}
        region={region}
        target={target}
      />
    </div>
  );
};

export default TypingEffect;
