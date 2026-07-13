#!/usr/bin/env python3
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# New methodology sections to add
new_methodology = '''

      <!-- Sensor Calibration & Data Processing -->
      <div class="calibration-section" data-aos="fade-up" data-aos-delay="200">
        <h3 class="sub-section-title"><i class="fas fa-sliders-h"></i> 3.4 Sensor Calibration & Data Processing</h3>
        <div class="calibration-content glass-card">
          <h4 style="color: var(--primary); margin-top: 15px; margin-bottom: 10px;"><i class="fas fa-droplet"></i> Soil Moisture Sensor Calibration</h4>
          <p>Accurate soil moisture measurement is critical to system performance. The capacitive soil moisture sensor outputs analog voltage (0–3.3V) which must be calibrated to real-world percentage values. The calibration process involves two reference measurements: (1) <strong>Dry Reference</strong>—place the sensor probe in completely dry soil (oven-dried at 105°C for 24 hours) and record the ADC value (typically 4095 when the probe is in air); (2) <strong>Saturated Reference</strong>—place the sensor probe in fully saturated soil (soaked with distilled water) and record the ADC value (typically 1000–1200 depending on soil composition). The linear mapping formula is: <em>Moisture % = ((ADC_max - ADC_raw) / (ADC_max - ADC_min)) × 100</em>. This two-point calibration accounts for soil-specific dielectric properties.</p>
          <h4 style="color: var(--primary); margin-top: 15px; margin-bottom: 10px;"><i class="fas fa-thermometer-half"></i> Temperature & Humidity Compensation</h4>
          <p>The DHT11 sensor provides raw temperature and humidity readings, but these values require post-processing for best accuracy. Temperature readings are corrected using a DHT11 offset calibration (typically ±2°C accuracy). Humidity readings are used to calculate the <strong>Dew Point</strong>—the temperature at which air becomes saturated and condensation forms. The dew point is calculated using the Magnus formula: <em>Dew Point = (b × ln(RH/100 + a×T/(b+T))) / (a - ln(RH/100 + a×T/(b+T)))</em>, where a=17.27, b=237.7, and T is temperature in °C. This provides insight into morning irrigation feasibility when dew formation naturally supplements soil moisture.</p>
          <h4 style="color: var(--primary); margin-top: 15px; margin-bottom: 10px;"><i class="fas fa-chart-line"></i> Noise Filtering & Averaging</h4>
          <p>Raw sensor values often contain electronic noise from PWM signals, Wi-Fi transmission, or electromagnetic interference from the relay coil. To ensure stable pump control, the firmware implements a <strong>moving average filter</strong>: the ESP32 takes 10 consecutive sensor readings over 2 seconds, discards the highest and lowest values, and averages the remaining 8. This smoothing reduces false positives where moisture briefly dips below the dry threshold, causing erratic pump cycling. Additionally, <strong>hysteresis</strong> is implemented in the decision logic: the pump turns ON only when moisture &lt; 30%, and remains ON until moisture &gt; 70%, preventing rapid on-off switching near the threshold boundary.</p>
        </div>
      </div>

      <!-- Power Management & Energy Analysis -->
      <div class="power-management-section" data-aos="fade-up" data-aos-delay="200">
        <h3 class="sub-section-title"><i class="fas fa-battery-full"></i> 3.5 Power Management & Energy Analysis</h3>
        <div class="power-content glass-card">
          <h4 style="color: var(--secondary); margin-bottom: 10px;"><i class="fas fa-solar-panel"></i> Solar Energy Generation & Storage</h4>
          <p>The 10W monocrystalline solar panel generates maximum power at peak sun hours (10:00 AM – 3:00 PM), producing approximately 10–12W during clear skies. Daily energy generation varies with weather: on a clear summer day, the panel generates ~60–80Wh; on a partially cloudy day, ~30–40Wh; on an overcast day, ~10–15Wh. The PWM solar charge controller regulates this variable voltage output to safely charge the 12V battery, preventing overcharging which would damage the lead-acid cells. The charge controller operates in three stages: <strong>Bulk charging</strong> (constant current ~8A) until battery reaches ~14.4V; <strong>Absorption charging</strong> (constant voltage at 14.4V) as current tapers to ~1A; <strong>Float charging</strong> (maintenance at 13.2V) to keep the battery fully charged without degradation. A fully charged 12V 7Ah battery contains 84Wh of usable energy (at 60% depth-of-discharge to extend lifespan, ~50Wh practical capacity).</p>
          <h4 style="color: var(--secondary); margin-top: 15px; margin-bottom: 10px;"><i class="fas fa-chart-bar"></i> System Power Consumption Analysis</h4>
          <p>The system's power budget is critical for autonomy prediction. <strong>Continuous loads</strong>: ESP32 microcontroller (~80mA at 3.3V = 0.26W) + DHT11 sensor (~1mA = 0.003W) + soil moisture sensor (~2mA = 0.02W) + Blynk Wi-Fi communication (~60mA average = 0.2W) = approximately 0.5W continuous consumption. <strong>Intermittent pump load</strong>: The 12V 3LPM water pump draws ~2A when running (24W). If the pump runs 3 hours per day on average, daily pump energy = 72Wh. Total daily consumption ≈ 0.5W × 24h + 72Wh = 12Wh (continuous) + 72Wh (pump) = 84Wh per day, matching the battery capacity perfectly. This demonstrates why a cloudy day with reduced solar generation requires automatic load-shedding (reducing pump frequency or disabling Wi-Fi if necessary) to maintain minimum night-time operation.</p>
          <h4 style="color: var(--secondary); margin-top: 15px; margin-bottom: 10px;"><i class="fas fa-eye"></i> Battery Health Monitoring & Deep Discharge Protection</h4>
          <p>Lead-acid batteries suffer permanent capacity loss if discharged below 10.5V (sulfation of lead plates). The system implements a <strong>low-voltage cutoff (LVC)</strong> circuit that disconnects the load when battery voltage drops below 11.0V, preserving 80% of the battery's lifespan. The ESP32 monitors battery voltage continuously via ADC on GPIO35 (with a voltage divider 39kΩ/10kΩ to scale 12V to 3.3V range), and logs low-voltage events to Blynk for predictive maintenance alerts. A healthy lead-acid battery should maintain 85–100% capacity for 3–4 years with proper charging management, but premature failures occur if subjected to repeated deep discharge cycles or overcharging.</p>
        </div>
      </div>

      <!-- Blynk Platform & Mobile App -->
      <div class="blynk-platform-section" data-aos="fade-up" data-aos-delay="300">
        <h3 class="sub-section-title"><i class="fas fa-cloud"></i> 3.6 Blynk IoT Cloud Platform & Mobile Dashboard</h3>
        <div class="blynk-content glass-card">
          <h4 style="color: var(--primary); margin-bottom: 10px;"><i class="fas fa-server"></i> Cloud Platform Architecture</h4>
          <p>Blynk is a cloud-based IoT platform that acts as a virtual bridge between the physical ESP32 hardware and the farmer's smartphone. The platform uses a secure MQTT (Message Queuing Telemetry Transport) protocol over TLS/SSL encryption to transmit sensor data and receive user commands. When the ESP32 powers on, it connects to the local Wi-Fi network, then establishes a secure TLS connection to Blynk's cloud servers using a unique authentication token (a 32-character string unique to each device). All sensor readings are published to virtual pins (V0 for moisture, V1 for temperature, V2 for humidity, etc.) at regular intervals (default 1 second), which are then displayed in real-time on the mobile app dashboard. The Blynk platform stores historical data for up to 30 days in its cloud database, enabling time-series analysis of soil moisture trends, seasonal patterns, and pump operation statistics.</p>
          <h4 style="color: var(--primary); margin-top: 15px; margin-bottom: 10px;"><i class="fas fa-mobile-alt"></i> Mobile Application Dashboard Features</h4>
          <p>The Blynk mobile app (available for iOS and Android) provides a customizable, real-time interface displaying all system parameters. The dashboard includes: (1) <strong>Gauge Widget</strong>—shows soil moisture as a circular gauge from 0–100% with color coding (red for dry, green for optimal, blue for wet); (2) <strong>Labeled Value Widgets</strong>—display temperature (°C), humidity (%RH), solar power (W), and battery voltage (V); (3) <strong>Chart Widget</strong>—plots historical moisture data over the last 6–24 hours for trend analysis; (4) <strong>Button Widgets</strong>—allow the farmer to manually toggle the pump ON/OFF regardless of automation logic; (5) <strong>Notification Settings</strong>—configure push alerts when moisture drops below emergency threshold (e.g., 20%), battery voltage falls critically low (e.g., &lt;11V), or pump runs continuously for &gt;30 minutes (indicating a possible malfunction). The app operates in both online and offline modes, with cached data displayed when Wi-Fi is unavailable.</p>
        </div>
      </div>'''

# Find location to insert before IoT Communication Architecture section
# We need to replace the old 3.4 heading with new 3.5, and insert our new sections
# Look for "3.4 IoT Communication Architecture" and replace with our new content plus updated heading

pattern = r'(<!-- IoT Communication -->)\s*(<div class="iot-comm-section"[^>]*>)\s*(<h3 class="sub-section-title"><i class="fas fa-network-wired"></i> 3\.4 IoT Communication Architecture</h3>)'

# Update the section numbers in the original content as well
replacement = new_methodology + r'\n\n      <!-- IoT Communication -->\n      <div class="iot-comm-section" data-aos="fade-up" data-aos-delay="200">\n        <h3 class="sub-section-title"><i class="fas fa-network-wired"></i> 3.7 IoT Communication Protocols & Security</h3>'

result = re.sub(pattern, replacement, content)

# Check if the replacement was made
if result != content:
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(result)
    print('Successfully added Methodology sections 3.4, 3.5, and 3.6!')
    print('Updated section 3.4 (IoT Communication) to 3.7')
else:
    print('Pattern not found. Checking available patterns...')
    if 'IoT Communication Architecture' in content:
        print('Found: IoT Communication Architecture')
    if 'Sensor Calibration' in content:
        print('Found: Sensor Calibration (already exists)')
