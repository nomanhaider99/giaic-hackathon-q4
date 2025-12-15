# Practical Examples and Code Snippets for Sensor Configurations

## Overview
This document provides practical examples and code snippets for configuring various sensors in simulation environments. These examples demonstrate common configuration patterns for LiDAR, cameras, and IMUs in digital twin systems.

## Key Concepts
- Sensor configuration in URDF/SDF
- Noise parameter tuning
- Calibration settings
- Integration with ROS 2

## Architecture
Sensor configuration examples follow these architectural patterns:

### 1. URDF/SDF Integration
The configuration includes:
- Sensor definitions in robot description files
- Physical mounting and alignment specifications
- Interface definitions for ROS 2 integration
- Parameter definitions for simulation plugins

### 2. Plugin Configuration
Plugin setup involves:
- Sensor-specific plugin parameters
- Noise and error model configuration
- Output format and frequency settings
- Frame and topic naming conventions

## Implementation
The following code snippets demonstrate practical implementation approaches:

### Example 1: LiDAR Configuration in URDF/SDF
```xml
<!-- In robot URDF/XACRO file -->
<gazebo reference="lidar_link">
  <sensor type="ray" name="main_lidar">
    <pose>0 0 0 0 0 0</pose> <!-- Position and orientation relative to link -->
    <visualize>false</visualize>
    <update_rate>10</update_rate>
    <ray>
      <scan>
        <horizontal>
          <samples>1080</samples>
          <resolution>1</resolution>
          <min_angle>-3.14159</min_angle> <!-- -180 degrees -->
          <max_angle>3.14159</max_angle>   <!-- 180 degrees -->
        </horizontal>
      </scan>
      <range>
        <min>0.1</min>
        <max>30.0</max>
        <resolution>0.01</resolution>
      </range>
    </ray>
    <plugin name="lidar_controller" filename="libgazebo_ros_ray_sensor.so">
      <ros>
        <namespace>/robot1</namespace>
        <remapping>~/out:=scan</remapping>
      </ros>
      <output_type>sensor_msgs/LaserScan</output_type>
      <frame_name>lidar_link</frame_name>
    </plugin>
  </sensor>
</gazebo>
```

### Example 2: Camera Configuration in URDF/SDF
```xml
<!-- In robot URDF/XACRO file -->
<gazebo reference="camera_link">
  <sensor type="camera" name="main_camera">
    <update_rate>30.0</update_rate>
    <camera name="head">
      <horizontal_fov>1.3962634</horizontal_fov> <!-- 80 degrees -->
      <image>
        <width>640</width>
        <height>480</height>
        <format>R8G8B8</format>
      </image>
      <clip>
        <near>0.1</near>
        <far>100</far>
      </clip>
      <noise>
        <type>gaussian</type>
        <mean>0.0</mean>
        <stddev>0.007</stddev>
      </noise>
    </camera>
    <plugin name="camera_controller" filename="libgazebo_ros_camera.so">
      <ros>
        <namespace>/robot1</namespace>
      </ros>
      <camera_name>camera</camera_name>
      <image_topic_name>image_raw</image_topic_name>
      <camera_info_topic_name>camera_info</camera_info_topic_name>
      <frame_name>camera_link</frame_name>
      <hack_baseline>0.07</hack_baseline>
      <distortion_k1>0.0</distortion_k1>
      <distortion_k2>0.0</distortion_k2>
      <distortion_k3>0.0</distortion_k3>
      <distortion_t1>0.0</distortion_t1>
      <distortion_t2>0.0</distortion_t2>
    </plugin>
  </sensor>
</gazebo>
```

### Example 3: IMU Configuration in URDF/SDF
```xml
<!-- In robot URDF/XACRO file -->
<gazebo reference="imu_link">
  <sensor name="imu_sensor" type="imu">
    <always_on>true</always_on>
    <update_rate>100</update_rate>
    <visualize>false</visualize>
    <imu>
      <angular_velocity>
        <x>
          <noise type="gaussian">
            <mean>0.0</mean>
            <stddev>2e-4</stddev>
            <bias_mean>0.0000075</bias_mean>
            <bias_stddev>0.0000008</bias_stddev>
          </noise>
        </x>
        <y>
          <noise type="gaussian">
            <mean>0.0</mean>
            <stddev>2e-4</stddev>
            <bias_mean>0.0000075</bias_mean>
            <bias_stddev>0.0000008</bias_stddev>
          </noise>
        </y>
        <z>
          <noise type="gaussian">
            <mean>0.0</mean>
            <stddev>2e-4</stddev>
            <bias_mean>0.0000075</bias_mean>
            <bias_stddev>0.0000008</bias_stddev>
          </noise>
        </z>
      </angular_velocity>
      <linear_acceleration>
        <x>
          <noise type="gaussian">
            <mean>0.0</mean>
            <stddev>1.7e-2</stddev>
            <bias_mean>0.1</bias_mean>
            <bias_stddev>0.001</bias_stddev>
          </noise>
        </x>
        <y>
          <noise type="gaussian">
            <mean>0.0</mean>
            <stddev>1.7e-2</stddev>
            <bias_mean>0.1</bias_mean>
            <bias_stddev>0.001</bias_stddev>
          </noise>
        </y>
        <z>
          <noise type="gaussian">
            <mean>0.0</mean>
            <stddev>1.7e-2</stddev>
            <bias_mean>0.1</bias_mean>
            <bias_stddev>0.001</bias_stddev>
          </noise>
        </z>
      </linear_acceleration>
    </imu>
    <plugin name="imu_plugin" filename="libgazebo_ros_imu_sensor.so">
      <ros>
        <namespace>/robot1</namespace>
        <remapping>~/out:=imu</remapping>
      </ros>
      <frame_name>imu_link</frame_name>
      <initial_orientation_as_reference>false</initial_orientation_as_reference>
    </plugin>
  </sensor>
</gazebo>
```

### Example 4: Sensor Processing Node in ROS 2 (Python)
```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan, Image, Imu
from cv_bridge import CvBridge
import numpy as np
import cv2

class SensorProcessor(Node):
    def __init__(self):
        super().__init__('sensor_processor')
        
        # Create subscribers for different sensor types
        self.scan_subscription = self.create_subscription(
            LaserScan,
            '/robot1/scan',
            self.scan_callback,
            10)
        
        self.image_subscription = self.create_subscription(
            Image,
            '/robot1/camera/image_raw',
            self.image_callback,
            10)
        
        self.imu_subscription = self.create_subscription(
            Imu,
            '/robot1/imu',
            self.imu_callback,
            10)
        
        # Publisher for processed data
        self.processed_scan_pub = self.create_publisher(LaserScan, '/processed_scan', 10)
        
        self.bridge = CvBridge()
        
    def scan_callback(self, msg):
        # Process LiDAR data
        # Example: Apply noise filtering
        ranges = np.array(msg.ranges)
        # Filter out invalid ranges (inf or nan values)
        valid_ranges = ranges[np.isfinite(ranges)]
        
        # Apply basic filtering (simple moving average)
        if len(valid_ranges) > 3:
            filtered_ranges = np.convolve(valid_ranges, 
                                        np.ones(3)/3, mode='same')
        
        # Create processed message and republish
        processed_msg = LaserScan()
        processed_msg.header = msg.header
        processed_msg.angle_min = msg.angle_min
        processed_msg.angle_max = msg.angle_max
        processed_msg.angle_increment = msg.angle_increment
        processed_msg.time_increment = msg.time_increment
        processed_msg.scan_time = msg.scan_time
        processed_msg.range_min = msg.range_min
        processed_msg.range_max = msg.range_max
        processed_msg.ranges = list(filtered_ranges) + list(ranges[len(valid_ranges):])
        
        self.processed_scan_pub.publish(processed_msg)
        
    def image_callback(self, msg):
        # Process camera data
        cv_image = self.bridge.imgmsg_to_cv2(msg, desired_encoding='bgr8')
        
        # Example: Apply Gaussian blur for noise reduction
        blurred_image = cv2.GaussianBlur(cv_image, (5, 5), 0)
        
        # Example: Detect edges using Canny edge detector
        gray_image = cv2.cvtColor(blurred_image, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray_image, 50, 150)
        
        # Convert back to ROS message format
        # (Processing would continue based on application requirements)
        
    def imu_callback(self, msg):
        # Process IMU data
        # Example: Calculate magnitude of linear acceleration
        acc_magnitude = np.sqrt(msg.linear_acceleration.x**2 + 
                               msg.linear_acceleration.y**2 + 
                               msg.linear_acceleration.z**2)
        
        # Example: Apply simple noise filtering to angular velocity
        # (In practice, this might use a Kalman filter or similar)
        
        self.get_logger().info(f'IMU acceleration magnitude: {acc_magnitude}')

def main(args=None):
    rclpy.init(args=args)
    
    sensor_processor = SensorProcessor()
    
    rclpy.spin(sensor_processor)
    
    sensor_processor.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Best Practices
- Use sensor specifications from the actual robot to configure simulation parameters
- Validate simulated sensor data against real sensor performance
- Include realistic noise and error models in sensor configurations
- Implement proper coordinate frame relationships
- Test sensor configurations in various environmental conditions
- Document all sensor parameters for reproducibility

## References
- Open Robotics. (2023). Gazebo Sensor Plugin Configuration. Gazebo Simulation Manual.
- ROS.org. (2023). Sensor Integration with ROS 2. ROS 2 Documentation.
- Quigley, M., Gerkey, B., & Smart, W. D. (2015). Programming Robots with ROS: A Practical Introduction to the Robot Operating System. O'Reilly Media.