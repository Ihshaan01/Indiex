import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQPage = () => {
  const { faqType } = useParams();
  const navigate = useNavigate();

  const publisherFAQs = [
    {
      question: "How can I sell my assets on this platform?",
      answer:
        "To sell assets, simply register as a publisher, upload your asset files, and set a price.",
    },
    {
      question: "Do I need to create a profile to sell assets?",
      answer:
        "Yes, a profile is necessary to manage your sales, track earnings, and interact with buyers.",
    },
    {
      question: "What types of assets can I sell?",
      answer:
        "You can sell game assets, scripts, music, sound effects, and art.",
    },
    {
      question: "Is there a commission fee for each sale?",
      answer:
        "Yes, the platform takes a small commission on each successful sale, which is deducted from your earnings.",
    },
    {
      question: "How do I get paid?",
      answer:
        "Payments are made via PayPal or bank transfer once your earnings reach the minimum payout threshold.",
    },
    {
      question: "Can I offer assets for free?",
      answer:
        "Yes, you can offer assets for free, but they must meet our quality standards.",
    },
    {
      question: "How do I market my assets?",
      answer:
        "We provide tools to promote your assets, including featured listings and promotional offers.",
    },
    {
      question: "Can I set my own pricing?",
      answer:
        "Yes, you can set your own price for assets, but we recommend checking the market for competitive pricing.",
    },
    {
      question: "Is there a limit to the number of assets I can upload?",
      answer:
        "No, there is no limit to the number of assets you can upload, but ensure each asset is unique and valuable.",
    },
    {
      question: "How can I track my sales?",
      answer:
        "You can track your sales and earnings directly from your publisher dashboard.",
    },
  ];

  const faqs = [
    {
      question: "What is this platform?",
      answer:
        "This platform is a marketplace for game developers, freelancers, and artists to sell assets, offer gigs, and play games.",
    },
    {
      question: "How do I sign up?",
      answer:
        "To sign up, click the 'Sign Up' button on the homepage and fill out the registration form.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "Yes, signing up and browsing the platform is free, but certain premium assets and features may require payment.",
    },
    {
      question: "Can I hire freelancers?",
      answer:
        "Yes, you can hire freelancers to work on your projects through the 'Gigs' section.",
    },
    {
      question: "Can I purchase assets?",
      answer:
        "Yes, you can purchase game assets from the 'Assets' section and use them in your projects.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept payments via PayPal, credit card, and bank transfer.",
    },
    {
      question: "Are there any discounts or promotions?",
      answer:
        "We offer occasional discounts and promotional offers. Subscribe to our newsletter for updates.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact our support team through the 'Contact Us' page or by emailing support@ourplatform.com.",
    },
    {
      question: "Can I sell my games on this platform?",
      answer:
        "Yes, you can sell your games by registering as a developer and submitting your game for review.",
    },
    {
      question: "Is there a mobile app for the platform?",
      answer:
        "Currently, we don't have a mobile app, but our platform is fully responsive and works on mobile devices.",
    },
  ];

  const [showPublisherFAQ, setShowPublisherFAQ] = useState(
    faqType === "publisher"
  );
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  useEffect(() => {
    setShowPublisherFAQ(faqType === "publisher");
    window.scrollTo(0, 0);
  }, [faqType]);
  // Redirect if no valid faqType is passed
  useEffect(() => {
    if (faqType !== "publisher" && faqType !== "user") {
      navigate("/faq/user"); // Default to "user" FAQ if the type is invalid
    }
  }, [faqType, navigate]);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-3 px-5 text-white">
        {/* FAQ Section with animations */}
        {showPublisherFAQ ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-8">Publisher FAQ</h2>
            <motion.div
              className="space-y-6"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {publisherFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.div
                    className="cursor-pointer flex items-center justify-between"
                    onClick={() => toggleFAQ(index)}
                    whileHover={{ scale: 0.97 }}
                  >
                    <p className="font-semibold text-xl">{faq.question}</p>
                    {openFAQIndex === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </motion.div>
                  {openFAQIndex === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-lg mt-2">{faq.answer}</p>
                    </motion.div>
                  )}
                  <div className="border-b border-gray-700 my-4" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-8">FAQ</h2>
            <motion.div
              className="space-y-6"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.div
                    className="cursor-pointer flex items-center justify-between"
                    onClick={() => toggleFAQ(index)}
                    whileHover={{ scale: 0.97 }}
                  >
                    <p className="font-semibold text-xl">{faq.question}</p>
                    {openFAQIndex === index ? (
                      <FaChevronUp className="text-white" />
                    ) : (
                      <FaChevronDown className="text-white" />
                    )}
                  </motion.div>
                  {openFAQIndex === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-lg mt-2">{faq.answer}</p>
                    </motion.div>
                  )}
                  <div className="border-b border-gray-700 my-4" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
