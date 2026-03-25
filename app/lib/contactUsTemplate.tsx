import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  companyName: string;
  businessEmailId: string;
  phoneNumber: string;
  website: string;
  message: string;
  source: string;
}

export const ContactUsEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  companyName,
  businessEmailId,
  phoneNumber,
  website,
  message,
  source,
}) => (
  <div>
    <h2>New contact arrived for Supply Chain Query</h2>

    <div
      style={{
        display: "grid",
        gridColumn: "1fr",
      }}
    >
      <div>
        <strong>Name</strong>
        <p>{fullName}</p>
      </div>
      <div>
        <strong>Company name</strong>
        <p>{companyName}</p>
      </div>
      <div>
        <strong>Business email id</strong>
        <p>{businessEmailId}</p>
      </div>
      <div>
        <strong>Phone number</strong>
        <p>{phoneNumber}</p>
      </div>
      <div>
        <strong>Website</strong>
        <p>{website}</p>
      </div>
      <div>
        <strong>Message</strong>
        <p>{message}</p>
      </div>
      <div>
        <strong>Source</strong>
        <p>{source}</p>
      </div>
    </div>
  </div>
);
