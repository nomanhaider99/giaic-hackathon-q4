// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Foundations',
      items: [
        'foundations/physical-ai-overview',
        'foundations/embodiment-constraints',
      ],
    },
    {
      type: 'category',
      label: 'Module 1: ROS 2 - The Robotic Nervous System',
      items: [
        'module-1-ros2/index',
        'module-1-ros2/ros2-architecture',
        'module-1-ros2/nodes-topics-services',
        'module-1-ros2/urdf-humanoids',
        'module-1-ros2/python-rclpy-integration',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Digital Twin - Simulation for Physical AI',
      items: [
        'module-2-digital-twin/index',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: AI-Robot Brain - NVIDIA Isaac for Perception and Navigation',
      items: [
        'module-3-isaac/index',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action - Connecting Language to Physical Action',
      items: [
        'module-4-vla/index',
      ],
    },
  ],
};

module.exports = sidebars;