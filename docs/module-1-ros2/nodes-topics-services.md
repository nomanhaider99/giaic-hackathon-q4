# Nodes, Topics, Services, and Actions: ROS 2 Communication Patterns

## Communication Fundamentals

ROS 2 provides multiple communication patterns to address different types of interactions in robotic systems. Understanding when and how to use each pattern is crucial for designing effective humanoid robot architectures.

## Nodes: The Processing Units

### Definition and Lifecycle

Nodes in ROS 2 are processes that perform computation and communicate with other processes. Each node has a well-defined lifecycle that includes:

- **Initialization**: Setting up parameters, publishers, subscribers, and services
- **Configuration**: Loading runtime parameters and establishing connections
- **Activation**: Beginning active computation and communication
- **Deactivation**: Gracefully stopping active processes
- **Cleanup**: Releasing resources and terminating

### Node Structure for Humanoid Robots

In humanoid robots, nodes typically represent functional subsystems:

```
Humanoid Robot Control Node Structure:
├── Perception Nodes
│   ├── Vision Processing Node
│   ├── Audio Processing Node
│   └── Tactile Sensor Node
├── Control Nodes
│   ├── Balance Control Node
│   ├── Motion Planning Node
│   └── Actuator Control Node
├── Navigation Nodes
│   ├── Path Planning Node
│   ├── Localization Node
│   └── Obstacle Avoidance Node
└── High-Level Behavior Nodes
    ├── Task Planning Node
    └── Human-Robot Interaction Node
```

## Topics: Publish/Subscribe Communication

### Asynchronous Data Streams

Topics provide asynchronous, one-way communication for data streams where the publisher doesn't need to know about subscribers. This pattern is ideal for:

- Sensor data distribution (camera images, LiDAR scans, IMU readings)
- Robot state information (joint positions, battery level)
- Environmental data (object detections, map updates)

### Quality of Service (QoS) Profiles

Topics support configurable Quality of Service settings:

- **Reliability**: Best effort vs. reliable delivery
- **Durability**: Volatile vs. transient local
- **History**: Keep last N messages vs. keep all messages
- **Deadline**: Maximum time between consecutive messages

For humanoid robots, QoS profiles are critical for ensuring appropriate behavior for different types of data. For example, joint state information might use reliable delivery with low latency, while non-critical status updates might use best-effort delivery.

## Services: Request/Response Communication

### Synchronous Operations

Services provide synchronous, two-way communication for operations that require a direct response. Good use cases include:

- Parameter configuration
- Transform lookups (TF)
- Map server requests
- Planning service requests

### Service Structure

Services follow a request/response pattern with well-defined message types:

```
Request: Service-specific input parameters
Response: Service-specific output or status
```

For humanoid robots, services might include:
- Requesting a specific robot configuration
- Asking for path planning to a destination
- Querying the current robot status

## Actions: Goal-Oriented Communication

### Long-Running Operations

Actions combine features of topics and services for operations that:

- Take a long time to complete
- Provide feedback during execution
- Can be preempted or canceled
- Report final results

### Action Components

Actions consist of three message types:
- **Goal**: The requested operation
- **Feedback**: Periodic status updates
- **Result**: Final outcome of the operation

In humanoid robots, actions are used for:
- Navigation to a specific location
- Manipulation of objects
- Complex behaviors like getting up from a fall

## Decision Guidance for Communication Primitive Selection

### When to Use Topics

Use topics for:
- Streaming sensor data
- State broadcasts
- Event notifications
- Information that multiple nodes need simultaneously

**Example**: Broadcasting camera images for perception algorithms

```python
# Camera image publisher
image_publisher = node.create_publisher(Image, 'camera/image_raw', 10)
```

### When to Use Services

Use services for:
- Operations with clear start/finish
- Queries that return specific results
- Configuration changes
- Operations that should not continue after the requestor is gone

**Example**: Requesting current robot position

```python
# Position query service
position_service = node.create_service(GetPosition, 'get_robot_position', handle_position_request)
```

### When to Use Actions

Use actions for:
- Operations that take time to complete
- Operations that need to be monitored or canceled
- Operations that provide ongoing feedback
- Complex behaviors with multiple stages

**Example**: Navigation to a goal location

```python
# Navigation action
nav_client = node.create_client(NavigateToPose, 'navigate_to_pose')
```

### Architectural Diagram: Comparison of Communication Patterns

```
Communication Pattern Comparison in ROS 2 for Humanoid Robots
=============================================================

TOPICS (Publish/Subscribe) - Asynchronous, One-way
--------------------------------------------------
Node A (Publisher)              Node B (Subscriber)
      |                              |
      |     Topic Message            |
      |----------------------------->|
      |                              |
      |     Topic Message            |
      |----------------------------->|
      |                              |
      |     Topic Message            |
      |----------------------------->|

Characteristics: High frequency, multiple subscribers, no response needed
Use Cases: Sensor data streaming, state broadcasts, event notifications

SERVICES (Request/Response) - Synchronous, Two-way
--------------------------------------------------
Node A (Client)                 Node B (Service)
      |                              |
      |---- Request ---------------->|
      |                              |---- Process Request
      |                              |
      |<--- Response ----------------|
      |                              |

Characteristics: Immediate response required, synchronous, request-response pattern
Use Cases: Parameter queries, configuration changes, immediate computations

ACTIONS (Goal-Feedback-Result) - Long-running with Status
---------------------------------------------------------
Node A (Client)                 Node B (Action Server)
      |                              |
      |---- Goal ------------------->|
      |                              |---- Process begins
      |                              |
      |<--- Feedback (repeated) ------| (during execution)
      |                              |
      |---- Cancel (optional) ------>| (if needed)
      |                              |
      |<--- Result ------------------| (when complete)

Characteristics: Long operations, feedback during processing, ability to cancel
Use Cases: Navigation, manipulation, complex behaviors
```

## Humanoid-Specific Examples

### Communication for Balance Control

Balance control in humanoid robots requires different communication patterns:

- **Topics**: Joint states, IMU data (high-frequency, asynchronous)
- **Services**: Requesting new balance parameters (synchronous configuration)
- **Actions**: Executing complex balance maneuvers (long-running with feedback)

### Perception-Action Integration

Perception systems in humanoid robots often combine multiple patterns:

- **Topics**: Streaming sensor data for real-time processing
- **Services**: Querying for object recognition results
- **Actions**: Requesting complex scene understanding tasks

## Trade-offs and Considerations

### Latency vs. Reliability

- Topics can provide lower latency but with less guarantee of delivery
- Services provide guaranteed delivery but with higher latency
- Actions provide the most comprehensive communication but with the highest complexity

### Resource Usage

- Topics consume memory for message queues
- Services tie up threads during processing
- Actions consume resources for maintaining state and feedback

## Relationship to Other Module 1 Topics

The communication patterns described here integrate with other Module 1 concepts:

- Understanding the underlying [ROS 2 Architecture](./ros2-architecture.md) helps explain why these patterns are designed as they are
- [URDF for Humanoid Robots](./urdf-humanoids.md) defines the robot structure that these communication patterns control
- [Python Integration](./python-rclpy-integration.md) shows how to implement these communication patterns in Python

## Integration with Module 4 (VLA)

The communication patterns established in this section form the foundation for the Vision-Language-Action systems covered in Module 4. Understanding nodes, topics, services, and actions is essential for implementing the complex, multi-modal integration required for humanoid robots that respond to natural language commands.

## Sources and Citations

- ROS 2 Documentation. (2023). Communication Patterns. Retrieved from https://docs.ros.org/
- Quigley, M., et al. (2009). "ROS: an open-source Robot Operating System". ICRA Workshop.
- DDS Council. (2020). "DDS Security Specification". Object Management Group standard.