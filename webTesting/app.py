from selenium import webdriver
from time import sleep
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By



driver = webdriver.Chrome()
driver.maximize_window()
# Navigate to login page
driver.get("http://127.0.0.1:5500/")


wait = driver.implicitly_wait(60) # this prevents the browser from closing immediately after opening web address


# Find the button element by its visible text using XPath
button_text = "Debug Room"  # Replace with the text on your button
debug_button = driver.find_element(By.XPATH, f"//*[text()='{button_text}']")
print(debug_button.text)

if debug_button:
    print(f"The '{button_text}' is present. TRUE!")
else:
    print(f"The '{button_text}' is not present. FALSE!")
#sleep(3)
#button.click()

# Execute Javascript Function
js_function = "GameOver();"
sleep(10)
driver.execute_script(js_function)
text_button = "Try Again?"
try_again_button = driver.find_element(By.XPATH, f"//*[text()='{text_button}']")

if try_again_button:
    print(f"The '{text_button}' is present. TRUE!")
else:
    print(f"The '{text_button}' is not present. FALSE!")



# Testing mouse click for shooting mechanism
# Find the game canvas element


# Testing boat movements
#driver.find_element(By.CLASS_NAME, 'p5Canvas').send_keys(Keys.ARROW_LEFT) # Player Up
#sleep(3)
#print("Boat moved left")

#driver.find_element('id', 'player').send_keys('a') # Player Left
#sleep(30)
# Simulate a mouse click at a specific position (the center of the canvas)


driver.quit()


 