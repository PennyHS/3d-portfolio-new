import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: 'rgba(26, 4, 41, 0.8)',
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}
    contentArrowStyle={{ borderRight: '7px solid rgba(26, 4, 41, 0.8)' }}
    date={experience.date}
    dateClassName="text-purple-300 font-medium"
    iconStyle={{ 
      background: experience.iconBg,
      boxShadow: '0 0 0 4px #2d0d4e',
      transition: 'all 0.3s ease',
    }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[90%] h-[90%] object-contain"
        />
      </div>
    }
  >
    <div className="hover:transform hover:scale-[1.01] transition-transform duration-300">
      <h3 className="text-white text-[24px] font-bold mb-1">
        {experience.title}
      </h3>
      <p className='text-purple-300 text-[16px] font-semibold' style={{margin:0}}>
        {experience.company_name}
      </p>
    </div>
    
    <ul className='mt-5 list-disc ml-5 space-y-2'>
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className='text-gray-200 text-[14px] pl-1 tracking-wider'
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="text-center">
        <p className={`${styles.sectionSubText} text-center`}>
          Explore My
        </p>
        <h2 className={styles.sectionHeadText}>Work Experiences</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
