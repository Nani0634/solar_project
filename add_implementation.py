#!/usr/bin/env python3
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Additional section to add after BOM table
bom_addition = '''

      <!-- Implementation & Deployment Guide -->
      <div class="deployment-section" data-aos="fade-up" data-aos-delay="300">
        <h3 class="sub-section-title" style="margin-top: 40px;"><i class="fas fa-tools"></i> 2.11 Implementation & Practical Deployment Guide</h3>
        
        <div class="impl-grid">
          <div class="impl-card glass-card" data-aos="fade-up" data-aos-delay="0">
            <h4 style="color: var(--primary); margin-bottom: 10px;"><i class="fas fa-wrench"></i> PCB Assembly & Wiring</h4>
            <p><strong>Prototyping Stage:</strong> Use a half-size breadboard for initial testing. Connect the ESP32 to power rails (GND and 3.3V via voltage regulator), then connect sensor pins (GPIO 34 for soil moisture ADC, GPIO 25 for DHT11 single-wire, GPIO 26 for relay control). <strong>Production Stage:</strong> Design a custom PCB using Kicad or Eagle CAD with proper ground planes and power distribution to minimize noise. Route high-current pump lines (12V from battery to relay coil) away from sensor signal lines to prevent cross-talk. Include filtering capacitors (100µF for power supply, 100nF ceramic for high-speed digital lines).</p>
          </div>
          
          <div class="impl-card glass-card" data-aos="fade-up" data-aos-delay="100">
            <h4 style="color: var(--primary); margin-bottom: 10px;"><i class="fas fa-network-wired"></i> Enclosure & Weather Protection</h4>
            <p><strong>Outdoor Housing:</strong> Place all electronics in a weatherproof ABS enclosure (200mm × 120mm × 100mm) with internal DIN-rail mounting for modular component placement. Drill cable glands for power input (solar panel), sensor cables (to field sensors), and pump relay output. Use silicone conformal coating on PCB to protect against moisture ingress. <strong>Field Sensor Deployment:</strong> Mount the soil moisture probe 10–15cm below soil surface at multiple locations (at least 1 per 0.5 hectare). Use waterproof connectors (M12 or IP67-rated) for all outdoor connections. The DHT11 sensor should be placed in a shaded, ventilated enclosure 1–1.5m above ground to avoid direct sunlight and ensure accurate ambient readings.</p>
          </div>
          
          <div class="impl-card glass-card" data-aos="fade-up" data-aos-delay="200">
            <h4 style="color: var(--primary); margin-bottom: 10px;"><i class="fas fa-solar-panel"></i> Solar Panel Installation & Battery Management</h4>
            <p><strong>Panel Positioning:</strong> Mount the solar panel at an angle equal to the site's latitude (to maximize year-round solar collection) or adjustable +/- 15° seasonally. Ensure minimum 4 hours of unobstructed sunlight daily. Clean the panel surface monthly with soft cloth and deionized water to remove dust and bird droppings. <strong>Battery Setup:</strong> Place the 12V lead-acid battery in a battery box with ventilation holes (hydrogen gas release during charging). Keep battery terminals covered with plastic caps. Check water levels (if unsealed battery) monthly and top up with distilled water. Store spares in cool, dry location—lead-acid batteries degrade in hot environments, so keep ambient temperature &lt;40°C.</p>
          </div>
          
          <div class="impl-card glass-card" data-aos="fade-up" data-aos-delay="300">
            <h4 style="color: var(--primary); margin-bottom: 10px;"><i class="fas fa-cog"></i> Firmware Flashing & Configuration</h4>
            <p><strong>Development Environment:</strong> Download Arduino IDE, install ESP32 board package via Board Manager. Install required libraries: WiFi.h (built-in), BlynkSimpleWifi.h (from Blynk GitHub), DHT.h (Adafruit DHT library). <strong>Blynk Setup:</strong> Create account on Blynk app (https://blynk.io), create new project, select ESP32 as device, copy the authentication token (32-character string). Configure virtual pins: V0 (moisture %), V1 (temperature), V2 (humidity), V3 (pump status), V4 (battery voltage), V5 (manual pump toggle). <strong>Code Customization:</strong> Update WiFi SSID, WiFi password, and Blynk token in the firmware. Adjust dry_threshold (default 30%) and wet_threshold (default 70%) based on crop type and soil calibration results.</p>
          </div>
          
          <div class="impl-card glass-card" data-aos="fade-up" data-aos-delay="400">
            <h4 style="color: var(--primary); margin-bottom: 10px;"><i class="fas fa-graduation-cap"></i> Farmer Training & Maintenance Schedule</h4>
            <p><strong>Initial Training:</strong> Conduct a 2-hour hands-on training session covering: (1) Mobile app navigation and reading gauge values; (2) Setting moisture thresholds appropriate for the crop; (3) Interpreting alerts and troubleshooting common issues; (4) Monthly maintenance checklist. <strong>Maintenance Schedule:</strong> <strong>Weekly:</strong> Check app for alerts, visually inspect soil probe for clogging, verify pump operation during auto-irrigation cycle. <strong>Monthly:</strong> Clean solar panel, check battery terminal corrosion, review moisture data trends. <strong>Quarterly:</strong> Recalibrate soil moisture sensor (optional, if readings drift &gt;5%), inspect relay contacts for arcing, test manual pump override. <strong>Annually:</strong> Replace battery (if showing &lt;90% capacity after 3 years of use), inspect all outdoor connectors for weathering, update firmware if new versions available.</p>
          </div>
        </div>
      </div>'''

# Find the BOM section and add implementation guide after it
pattern = r'(</table>\s*</div>\s*</div>)\s*(</div>\s*</section>)(?=\s*<!-- ===================== METHODOLOGY)'

replacement = r'\1' + bom_addition + r'\n    \2'

result = re.sub(pattern, replacement, content)

if result != content:
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(result)
    print('Successfully added Implementation & Deployment Guide to Hardware section!')
    print('Added practical guidance on PCB assembly, enclosure design, and farmer training.')
else:
    print('Pattern not found. Will try alternative approach...')
    # Try a simpler replacement
    if '</table>' in content and 'BOM' in content:
        # Find the BOM table end and add after it
        idx = content.rfind('</table>')
        if idx != -1:
            # Find the next section end marker
            next_section_idx = content.find('</section>', idx)
            if next_section_idx != -1:
                new_content = content[:next_section_idx] + bom_addition + content[next_section_idx:]
                with open('index.html', 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print('Successfully added Implementation & Deployment Guide (alternative method)!')
