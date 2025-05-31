import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

export const NotificationContainer = styled.div`
  width: 100%;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const NotificationItem = styled.div`
  background-color: ${({ type }) =>
    type === "success" ? "#4caf50" : type === "error" ? "#ff4d4d" : "#ffa726"};
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(29, 24, 54, 0.84);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(50, 24, 204, 0.5) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  &:hover {
    border: ${(props) =>
      props.disabled ? "none" : `1px solid ${({ theme }) => theme.primary}`};
    color: ${({ theme }) => theme.text_primary};
    background-color: ${(props) =>
      props.disabled ? "hsla(271, 100%, 50%, 0.5)" : "transparent"};
  }
`;

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const addNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000); // Clear after 4s
  };

  const validateForm = (formData) => {
    const { from_email, from_name, subject, message } = formData;
    if (!from_email || !from_name || !subject || !message) {
      addNotification("All fields are required.", "error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      addNotification("Please enter a valid email address.", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      from_email: form.current.from_email.value.trim(),
      from_name: form.current.from_name.value.trim(),
      subject: form.current.subject.value.trim(),
      message: form.current.message.value.trim(),
    };

    if (!validateForm(formData)) return;

    setIsLoading(true);

    emailjs
      .sendForm(
        "service_mmuuwdt",
        "template_9en2ptl",
        form.current,
        "KP5da9fXz_-QFQ2Gq"
      )
      .then(
        () => {
          addNotification("Message sent successfully! 🚀", "success");
          form.current.reset();
          setIsLoading(false);
        },
        () => {
          addNotification("Failed to send message. Please try again.", "error");
          setIsLoading(false);
        }
      );
  };

  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          {notification && (
            <NotificationContainer>
              <NotificationItem type={notification.type}>
                {notification.message}
              </NotificationItem>
            </NotificationContainer>
          )}
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput
            placeholder="Your Email"
            name="from_email"
            type="email"
          />
          <ContactInput placeholder="Your Name" name="from_name" />
          <ContactInput placeholder="Subject" name="subject" />
          <ContactInputMessage placeholder="Message" name="message" rows={4} />
          <ContactButton type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </ContactButton>
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
