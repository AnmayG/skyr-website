import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(26, GPIO.OUT)

while True:
    GPIO.output(26, True)
    time.sleep(1)
    GPIO.output(26, False)
    time.sleep(1)
