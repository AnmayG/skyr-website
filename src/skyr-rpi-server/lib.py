import RPi.GPIO as GPIO
import time

def start():
        GPIO.setmode(GPIO.BCM)

def set_outputs(*pins):
    for pin in pins:
        GPIO.setup(pin, GPIO.OUT)
        GPIO.output(pin, False)

def turn_on(*pins):
    for pin in pins:
        GPIO.output(pin, True)

def turn_off(*pins):
    for pin in pins:
        GPIO.output(pin, False)

def blink(pin, delay):
    GPIO.output(pin, True)
    time.sleep(delay)
    GPIO.output(pin, False)
    time.sleep(delay)

def run_servo(pin, delay):
    GPIO.output(pin, True)
    time.sleep(delay)
    GPIO.output(pin, False)
    time.sleep(delay)

def move(kit, delay, power, zero1, zero2):
    kit.continuous_servo[1].throttle = power + zero1
    kit.continuous_servo[2].throttle = power + zero2
    time.sleep(delay)
    kit.continuous_servo[1].throttle = zero1
    kit.continuous_servo[2].throttle = zero2
    
def turn(kit, delay, motor, power, zero1, zero2):
    if motor == 1:
        kit.continuous_servo[1].throttle = zero1 + power
        kit.continuous_servo[2].throttle = zero2
        time.sleep(delay)
        kit.continuous_servo[1].throttle = zero1
    else:
        kit.continuous_servo[2].throttle = zero2 - power
        kit.continuous_servo[1].throttle = zero1
        time.sleep(delay)
        kit.continuous_servo[2].throttle = zero2

