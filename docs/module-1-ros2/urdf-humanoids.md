# URDF for Humanoid Robots: Modeling Physical Structure

## Unified Robot Description Format (URDF)

Unified Robot Description Format (URDF) is an XML-based format for representing robot models in ROS. For humanoid robots, URDF describes the physical structure including links, joints, and their relationships, enabling simulation, visualization, and kinematic analysis.

## URDF Structure and Semantics

### Core Elements

A URDF file consists of three fundamental elements:

- **Links**: Rigid parts of the robot (e.g., torso, limbs, head)
- **Joints**: Connections between links that allow relative motion
- **Materials**: Visual properties for rendering and simulation

### Architectural Diagram: URDF Structure for Humanoid Robot

```
URDF Model Structure for Humanoid Robot
=======================================

Robot Definition
├── base_link (coordinate reference frame)
│   ├── Joint: base_to_torso (fixed joint)
│   │   └── Link: torso
│   │       ├── Joint: left_hip (revolute joint)
│   │       │   └── Link: left_thigh
│   │       │       ├── Joint: left_knee (revolute joint)
│   │       │       │   └── Link: left_shin
│   │       │       │       └── Joint: left_ankle (revolute joint)
│   │       │       │           └── Link: left_foot
│   │       ├── Joint: right_hip (revolute joint)
│   │       │   └── Link: right_thigh
│   │       │       ├── Joint: right_knee (revolute joint)
│   │       │       │   └── Link: right_shin
│   │       │       │       └── Joint: right_ankle (revolute joint)
│   │       │       │           └── Link: right_foot
│   │       ├── Joint: torso_to_head (revolute joint)
│   │       │   └── Link: head
│   │       ├── Joint: torso_to_left_shoulder (revolute joint)
│   │       │   └── Link: left_upper_arm
│   │       │       ├── Joint: left_elbow (revolute joint)
│   │       │       │   └── Link: left_forearm
│   │       │       │       └── Joint: left_wrist (revolute joint)
│   │       │       │           └── Link: left_hand
│   │       └── Joint: torso_to_right_shoulder (revolute joint)
│   │           └── Link: right_upper_arm
│   │               ├── Joint: right_elbow (revolute joint)
│   │               │   └── Link: right_forearm
│   │               │       └── Joint: right_wrist (revolute joint)
│   │               │           └── Link: right_hand
│   │
│   └── Additional links and joints for complete humanoid model

Link Properties:
├── Inertial: Mass, center of mass, and inertia tensor
├── Visual: Shape, color, and mesh for visualization
└── Collision: Shape for collision detection in simulation

Joint Properties:
├── Type: revolute, continuous, prismatic, fixed, etc.
├── Limits: Range of motion, effort, and velocity constraints
├── Dynamics: Damping and friction parameters
└── Origin: Position and orientation relative to parent
```

### Basic Humanoid URDF Structure

```xml
<?xml version="1.0"?>
<robot name="humanoid_robot">
  <!-- World reference frame -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.1 0.1 0.1"/>
      </geometry>
    </visual>
  </link>

  <!-- Torso -->
  <link name="torso">
    <visual>
      <geometry>
        <capsule radius="0.1" length="0.5"/>
      </geometry>
    </visual>
  </link>

  <!-- Joint connecting base to torso -->
  <joint name="base_to_torso" type="fixed">
    <parent link="base_link"/>
    <child link="torso"/>
    <origin xyz="0 0 0.3" rpy="0 0 0"/>
  </joint>

  <!-- Additional links and joints for limbs... -->
</robot>
```

## Humanoid-Specific Modeling Considerations

### Bipedal Locomotion Requirements

Modeling humanoid robots requires special attention to:

- **Degrees of Freedom**: Adequate joints for balance and locomotion
- **Center of Mass**: Proper mass distribution for stability
- **Foot Placement**: Appropriate foot geometry for stable stance

### Human-Inspired Joint Configurations

Humanoid robots typically include:

- **6-DOF Head**: For vision and interaction
- **Multi-DOF Arms**: Shoulders, elbows, wrists for manipulation
- **Multi-DOF Legs**: Hips, knees, ankles for locomotion
- **Trunk Joints**: For upper body movement and flexibility

## Links: Defining Physical Components

### Link Properties

Each link in a URDF defines:

- **Inertial properties**: Mass, center of mass, and inertia tensor
- **Visual properties**: Shape, color, and mesh for visualization
- **Collision properties**: Shape for collision detection in simulation

### Example Link Definition for Humanoid Torso

```xml
<link name="torso">
  <inertial>
    <mass value="5.0"/>
    <origin xyz="0 0 0.25" rpy="0 0 0"/>
    <inertia ixx="0.2" ixy="0" ixz="0" iyy="0.2" iyz="0" izz="0.1"/>
  </inertial>
  <visual>
    <origin xyz="0 0 0.25" rpy="0 0 0"/>
    <geometry>
      <capsule radius="0.1" length="0.5"/>
    </geometry>
    <material name="light_grey">
      <color rgba="0.7 0.7 0.7 1.0"/>
    </material>
  </visual>
  <collision>
    <origin xyz="0 0 0.25" rpy="0 0 0"/>
    <geometry>
      <capsule radius="0.1" length="0.5"/>
    </geometry>
  </collision>
</link>
```

## Joints: Defining Motion Constraints

### Joint Types for Humanoid Robots

URDF supports several joint types, each appropriate for different human-like motions:

- **Revolute**: Rotational joint with limits (e.g., elbow, knee)
- **Continuous**: Rotational joint without limits (e.g., shoulder, hip)
- **Prismatic**: Linear sliding joint (less common in humanoids)
- **Fixed**: No motion between links (e.g., mounting points)
- **Floating**: 6-DOF joint (rarely used)
- **Planar**: Motion in a plane (rarely used)

### Example Joint Definition for Humanoid Knee

```xml
<joint name="right_knee" type="revolute">
  <parent link="right_thigh"/>
  <child link="right_shin"/>
  <origin xyz="0 0 -0.5" rpy="0 0 0"/>
  <axis xyz="1 0 0"/>
  <limit lower="-1.57" upper="0" effort="100" velocity="3.14"/>
  <dynamics damping="1.0" friction="0.1"/>
</joint>
```

### Bipedal Stability Considerations

For bipedal locomotion, joint definitions must consider:

- **Range of Motion**: Sufficient flexibility for walking gaits
- **Stiffness and Damping**: Proper values for stable control
- **Load Capacities**: Adequate effort limits for realistic motion

## URDF for Simulation vs. Real Robots

### Simulation Considerations

For simulation environments:

- **Simplified geometry**: Use basic shapes for collision detection to improve performance
- **Accurate inertial properties**: Essential for realistic physics simulation
- **Proper joint limits**: Match the intended simulated robot's capabilities

### Real Robot Considerations

For mapping to real robots:

- **Accurate dimensions**: Match the physical robot precisely
- **Motor specifications**: Include effort and velocity constraints that match hardware
- **Sensor placement**: Define attachment points for sensors and controllers

## Common Errors and Validation Strategies

### Frequent URDF Issues

1. **Non-physical inertial matrices**: Inertia values that don't correspond to any physical object
2. **Missing joints**: Links not connected to the main kinematic chain
3. **Incorrect joint limits**: Values that exceed hardware capabilities
4. **Inconsistent units**: Mixing metric and imperial measurements

### Validation Approaches

- **Static validation**: Use `check_urdf` tool to verify syntax and structure
- **Visualization**: Load in RViz to verify structure matches expectations
- **Kinematic testing**: Verify that kinematic chains function properly
- **Simulation testing**: Test in Gazebo or other simulators for physical plausibility

## Integration with ROS 2 Ecosystem

### Transform Trees (TF)

URDF automatically generates a transform tree (TF) that allows different nodes to understand the spatial relationships between robot components. This is essential for:

- Robot state publishing
- Coordinate frame transformations
- Sensor data integration
- Planning and control algorithms

### Robot State Publisher

The robot_state_publisher node uses URDF to broadcast the current state of all joints, allowing visualization and planning tools to understand the robot's current configuration.

## Advanced URDF Features for Humanoids

### Transmission Elements

For real robots, transmission elements define how actuators connect to joints:

```xml
<transmission name="right_knee_trans">
  <type>transmission_interface/SimpleTransmission</type>
  <joint name="right_knee">
    <hardwareInterface>hardware_interface/PositionJointInterface</hardwareInterface>
  </joint>
  <actuator name="right_knee_motor">
    <hardwareInterface>hardware_interface/PositionJointInterface</hardwareInterface>
    <mechanicalReduction>1</mechanicalReduction>
  </actuator>
</transmission>
```

### Gazebo-Specific Extensions

For simulation, URDF can include Gazebo-specific elements:

```xml
<gazebo reference="torso">
  <material>Gazebo/Grey</material>
  <mu1>0.2</mu1>
  <mu2>0.2</mu2>
</gazebo>
```

## Example: Complete Humanoid URDF Fragment

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">
  <!-- Torso -->
  <link name="torso">
    <inertial>
      <mass value="10.0"/>
      <origin xyz="0 0 0.25" rpy="0 0 0"/>
      <inertia ixx="0.5" ixy="0" ixz="0" iyy="0.5" iyz="0" izz="0.3"/>
    </inertial>
    <visual>
      <origin xyz="0 0 0.25" rpy="0 0 0"/>
      <geometry>
        <capsule radius="0.1" length="0.5"/>
      </geometry>
    </visual>
    <collision>
      <origin xyz="0 0 0.25" rpy="0 0 0"/>
      <geometry>
        <capsule radius="0.1" length="0.5"/>
      </geometry>
    </collision>
  </link>

  <!-- Right Thigh -->
  <link name="right_thigh">
    <inertial>
      <mass value="3.0"/>
      <origin xyz="0 0 -0.25" rpy="0 0 0"/>
      <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.05"/>
    </inertial>
    <visual>
      <origin xyz="0 0 -0.25" rpy="0 0 0"/>
      <geometry>
        <capsule radius="0.08" length="0.5"/>
      </geometry>
    </visual>
    <collision>
      <origin xyz="0 0 -0.25" rpy="0 0 0"/>
      <geometry>
        <capsule radius="0.08" length="0.5"/>
      </geometry>
    </collision>
  </link>

  <!-- Hip Joint -->
  <joint name="right_hip" type="revolute">
    <parent link="torso"/>
    <child link="right_thigh"/>
    <origin xyz="-0.05 -0.1 -0.1" rpy="0 0 0"/>
    <axis xyz="1 0 0"/>
    <limit lower="-1.0" upper="1.0" effort="200" velocity="2.0"/>
  </joint>

  <!-- Additional joints and links for full model... -->
</robot>
```

## Relationship to Other Module 1 Topics

URDF models connect with other Module 1 concepts in important ways:

- [ROS 2 Architecture](./ros2-architecture.md) provides the framework for how URDF models are used in robotic systems
- [Nodes, Topics, Services](./nodes-topics-services.md) are used to publish URDF model states and receive commands
- [Python Integration](./python-rclpy-integration.md) shows how to work with URDF models in Python nodes

## References to Later Modules

URDF models created in this module serve as the foundation for:

- Module 2: Digital twin simulation using the same robot models
- Module 3: Perception algorithms that understand the robot's structure
- Module 4: Action planning systems that consider the robot's kinematics

## Sources and Citations

- Smart, W. (2021). "URDF: Unified Robot Description Format". ROS Wiki.
- Chitta, S., et al. (2012). "Collision Detection in Complex Environments". Journal of Robotics Research.
- ROS-Industrial Consortium. (2020). "URDF Best Practices". Technical documentation.