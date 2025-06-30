import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from "./components";

const App = () => {
  useEffect(() => {
    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
      .then(({ createChat }) => {
        createChat({
          webhookUrl: 'https://n8n-62tp.onrender.com/webhook/e137dfbb-3366-4952-a287-dfa789ff6bbf/chat',
          defaultLanguage: 'en',
          initialMessages: [
            "Hello! 👋",
            "I'm Ahmed — feel free to ask me anything or book a meeting. I'm here to help you out!"
          ],
          i18n: {
          	en: {
                  title: 'Ahmed 💬',
                  subtitle: "Got a question or want to book a meeting? I’ma here 24/7 to assist you.",
                  getStarted: 'Begin Chat'
              },
        	},
          
         
        });
      });
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
