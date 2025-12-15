import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Physical AI & Embodiment',
    Svg: require('../../static/img/ai-robot.svg').default,
    description: (
      <>
        Explore how artificial intelligence can be embodied in physical systems,
        creating robots that can interact with the real world. Understand the
        unique challenges and opportunities this presents.
      </>
    ),
  },
  {
    title: 'Humanoid Robotics',
    Svg: require('../../static/img/humanoid-robot.svg').default,
    description: (
      <>
        Learn about humanoid robot platforms designed to operate in human
        environments. From locomotion to manipulation, discover the complex
        systems that enable human-like robot behavior.
      </>
    ),
  },
  {
    title: 'Complete Integration',
    Svg: require('../../static/img/integration.svg').default,
    description: (
      <>
        Follow a progressive learning path from ROS 2 fundamentals to advanced
        Vision-Language-Action systems, building complete physical AI systems
        that can understand and respond to the world around them.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}