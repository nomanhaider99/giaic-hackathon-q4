# Practical Examples and Code Snippets for Unity-ROS Integration

## Overview
This document provides practical examples and code snippets for integrating Unity with ROS 2 in digital twin systems. These examples demonstrate common integration patterns and best practices for creating Unity-based visualization and HRI interfaces.

## Key Concepts
- Unity-ROS bridge setup
- Message publishing and subscribing
- Transform synchronization
- Visualization best practices

## Architecture
Practical Unity-ROS implementations follow these architectural patterns:

### 1. Bridge Configuration
The bridge setup includes:
- Network configuration and connection management
- Message routing and topic mapping
- Error handling and connection recovery

### 2. Message Handling
Message handling involves:
- Publishers for Unity-generated data
- Subscribers for ROS 2 data
- Message serialization and deserialization

### 3. Transform Management
Transform systems manage:
- Coordinate system conversions
- Robot model synchronization
- Camera and sensor alignment

## Implementation
The following code snippets demonstrate practical implementation approaches:

### Example 1: Basic Unity-ROS Connection Setup
```csharp
using Unity.Robotics.ROSTCPConnector;
using UnityEngine;

public class RosConnector : MonoBehaviour
{
    public string rosIPAddress = "127.0.0.1";
    public int rosPort = 10000;
    
    private ROSConnection ros;
    
    void Start()
    {
        ros = ROSConnection.instance;
        ros.Initialize(rosIPAddress, rosPort);
        Debug.Log("ROS connection initialized");
    }
    
    void OnApplicationQuit()
    {
        ros.Disconnect();
    }
}
```

### Example 2: Subscribing to Joint States
```csharp
using Unity.Robotics.ROSTCPConnector;
using Unity.Robotics.ROSTCPConnector.MessageTypes.Sensor;
using UnityEngine;

public class JointStateSubscriber : MonoBehaviour
{
    public string topicName = "/joint_states";
    
    private ROSConnection ros;
    
    void Start()
    {
        ros = ROSConnection.instance;
        ros.Subscribe<JointStateMsg>(topicName, OnJointStateReceived);
    }
    
    void OnJointStateReceived(JointStateMsg jointState)
    {
        // Update robot model in Unity based on joint states
        for (int i = 0; i < jointState.name.Count; i++)
        {
            string jointName = jointState.name[i];
            float jointPosition = (float)jointState.position[i];
            
            // Find and update the corresponding joint in Unity
            Transform jointTransform = FindJoint(jointName);
            if (jointTransform != null)
            {
                // Apply the joint position to Unity transform
                UpdateJointTransform(jointTransform, jointPosition);
            }
        }
    }
    
    Transform FindJoint(string jointName)
    {
        // Implementation to find joint by name in Unity hierarchy
        return transform.Find(jointName);
    }
    
    void UpdateJointTransform(Transform joint, float position)
    {
        // Apply position to Unity transform (conversion may be needed)
        joint.localRotation = Quaternion.Euler(0, position * Mathf.Rad2Deg, 0);
    }
}
```

### Example 3: Publishing Sensor Data from Unity
```csharp
using Unity.Robotics.ROSTCPConnector;
using Unity.Robotics.ROSTCPConnector.MessageTypes.Sensor;
using UnityEngine;

public class UnityCameraPublisher : MonoBehaviour
{
    public string topicName = "/unity_camera/image_raw";
    public Camera unityCamera;
    private ROSConnection ros;
    
    void Start()
    {
        ros = ROSConnection.instance;
    }
    
    void Update()
    {
        // Capture image from Unity camera (at a specific frequency)
        if (Time.frameCount % 30 == 0) // Publish every 30 frames
        {
            PublishCameraImage();
        }
    }
    
    void PublishCameraImage()
    {
        // Capture image from Unity camera
        RenderTexture currentRT = RenderTexture.active;
        RenderTexture.active = unityCamera.targetTexture;
        unityCamera.Render();
        
        Texture2D imageTexture = new Texture2D(unityCamera.targetTexture.width, 
                                               unityCamera.targetTexture.height);
        imageTexture.ReadPixels(new Rect(0, 0, unityCamera.targetTexture.width, 
                                         unityCamera.targetTexture.height), 0, 0);
        imageTexture.Apply();
        
        RenderTexture.active = currentRT;
        
        // Convert Texture2D to ROS message format
        // Note: Practical implementation would involve more complex image encoding
        
        // Publish the image message
        ImageMsg imageMsg = new ImageMsg
        {
            header = new std_msgs.HeaderMsg { 
                stamp = new builtin_interfaces.TimeMsg { sec = (int)Time.time, nanosec = 0 },
                frame_id = "unity_camera_optical" 
            },
            height = (uint)imageTexture.height,
            width = (uint)imageTexture.width,
            encoding = "rgb8",
            is_bigendian = 0,
            step = (uint)(imageTexture.width * 3), // 3 bytes per pixel for RGB
            data = imageTexture.GetRawTextureData<byte>()
        };
        
        ros.Publish(topicName, imageMsg);
    }
}
```

### Example 4: Publishing Custom Robot Commands
```csharp
using Unity.Robotics.ROSTCPConnector;
using Unity.Robotics.ROSTCPConnector.MessageTypes.Std;
using UnityEngine;

public class RobotCommandPublisher : MonoBehaviour
{
    public string topicName = "/robot_command";
    private ROSConnection ros;
    
    void Start()
    {
        ros = ROSConnection.instance;
    }
    
    public void SendRobotCommand(string command, float[] parameters)
    {
        // Create a custom command message (in practice, you'd define a custom message type)
        StringMsg cmdMsg = new StringMsg
        {
            data = command + ":" + string.Join(",", parameters)
        };
        
        ros.Publish(topicName, cmdMsg);
    }
    
    // Example: Send a movement command
    public void MoveToPosition(float x, float y, float z)
    {
        float[] params = { x, y, z };
        SendRobotCommand("move_to", params);
    }
}
```

## Best Practices
- Use appropriate data structures to minimize message serialization overhead
- Implement connection health checks and automatic reconnection
- Batch messages when possible to reduce network overhead
- Use appropriate message frequency to balance real-time performance with network load
- Validate message content before applying to Unity objects
- Implement proper error logging and debugging information

## References
- ROS-Industrial Consortium. (2023). Unity Robotics Package Examples. GitHub Repository.
- Unity Technologies. (2023). Unity Scripting API. Unity Documentation.
- Open Robotics. (2023). ROS 2 Message Types Documentation. ROS 2 Website.