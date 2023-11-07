from selenium import webdriver
from time import sleep
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()

# Navigate to login page
driver.get("http://127.0.0.1:5500/")


wait = driver.implicitly_wait(60) # this prevents the browser from closing immediately after opening web address


# Testing mouse click for shooting mechanism
# Find the game canvas element


# Testing boat movements
driver.find_element('id', 'player').send_keys(Keys.ARROW_LEFT) # Player Up
sleep(3)
print("Left button clicked")

driver.find_element('id', 'player').send_keys('a') # Player Left
sleep(30)
# Simulate a mouse click at a specific position (the center of the canvas)

driver.find_element('id', 'player').send_keys('d') # Player Right
sleep(30)


driver.find_element('id', 'player').send_keys('s') # Player Down
sleep(30)


driver.quit()