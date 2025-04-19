import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { LightweightGlobe } from "./canvas"; 
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

//service_xhrcvob
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await emailjs.send(
        '', // Service ID
        '', //templateID
        {
          from_name: form.name,
          to_name: "Jane",
          from_email: form.email,
          to_email: "123@test.com",
          message: form.message,
        },
        '', // Public Key
      )
        setLoading(false);

        alert('Your message has been sent!');

        setForm({
          name: '',
          email: '',
          message: '',
        });
          }

    catch (error) {
      setLoading(false);

      console.log(error);

      alert('Ahh, something went wrong. Please try again.');
    };
  }


  return (
   <div className="w-full md:mb-0 relative xl:-mt-96 md:-mt-96 sm: mt-96 ">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-50 -z-10"></div>
      
      <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10  overflow-hidden`}>
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.75] backdrop-blur-lg bg-white/10 dark:bg-black/20 p-8 rounded-3xl shadow-xl border border-white/20 dark:border-white/10'
        >
          <p className="text-sm font-medium text-white/80 uppercase tracking-widest">Get in touch</p>
          <h3 className="text-4xl font-bold text-white mt-2">Contact</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-8 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-white/90 font-medium mb-4'>Full Name</span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                required
                placeholder="James Bond"
                className='bg-white/10 py-4 px-4 rounded-xl placeholder:text-white/50 text-white outline-none border border-white/20 focus:border-white/50 transition-colors font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white/90 font-medium mb-4'>Email</span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                required
                placeholder="1235425@mail.com"
                className='bg-white/10 py-4 px-4 rounded-xl placeholder:text-white/50 text-white outline-none border border-white/20 focus:border-white/50 transition-colors font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white/90 font-medium mb-4'>Message</span>
              <textarea
                rows={6}
                name='message'
                value={form.message}
                onChange={handleChange}
                required
                placeholder='How can I help you?'
                className='bg-white/10 py-4 px-4 rounded-xl placeholder:text-white/50 text-white outline-none border border-white/20 focus:border-white/50 transition-colors font-medium resize-none'
              />
            </label>

            <button
              type='submit'
              className='backdrop-blur-md bg-white/20 hover:bg-white/30 py-4 px-8 outline-none w-fit text-white font-bold border border-white/30 transition-all rounded-xl shadow-lg'
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
        
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className='xl:flex-1 xl:h-[600px] lg:h-[580px] md:h-[550px] h-[300px] min-h-[300px] relative z-0 p-6 flex items-center justify-center'
        >
          <div className="w-full h-full flex items-center justify-center">
            <LightweightGlobe />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");