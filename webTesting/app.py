from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()

# Navigate to login page
driver.get("http://127.0.0.1:5500/")


wait = driver.implicitly_wait(60) # this prevents the browser from closing immediately after opening web address

# Testing mouse click for shooting mechanism
# Find the game canvas element
canvas = driver.find_element('id', 'game-canvas')

# Simulate a mouse click at a specific position (the center of the canvas)
action = webdriver.common.action_chains.ActionChains(driver)
action.move_to_element_with_offset(canvas, canvas.size['width'] / 2, canvas.size['height'] / 2)
action.click().perform()

time.sleep(15)
driver.quit()



