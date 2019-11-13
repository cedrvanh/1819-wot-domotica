# Import Libraries
import firebase_admin
from firebase_admin import credentials, firestore
from sense_hat import SenseHat

# Create instance of SenseHat
sense = SenseHat()

# Get credentials from JSON 
cred = credentials.Certificate('./firebase-credentials.json')

# Initialize the app with given credentials
firebase_admin.initialize_app(cred)

# Create instance of Firestore
db = firestore.client()

# Update sensor data to DB
def update_sensors():
    sensors = {u'temperature': sense.get_temperature(), u'humidity': sense.get_humidity()}

    for sensor in sensors:
        try: 
            db.collection(u'sensors').document(sensor).update({
                u'value': round(sensors[sensor])
            })
        except:
            print(u'Could not retrieve and update sensor data..')

# Return color according to device type and status
def get_color_by_device(device, status):
    if device == 'lights':
        on = (255, 255, 0)
        off = (55, 55, 0)

        if status:
            return on
        else:
            return off
    
    elif device == 'outlets':
        on = (0, 255, 255)
        off = (0, 0, 55)
        
        if status:
            return on
        else:
            return off

    else: 
        on = (0, 255, 0)
        off = (255, 0, 0)
        
        if status:
            return on
        else:
            return off


# Populate pixels on LED matrix
def populate_pixels(arr, color = [0, 0, 0]):
    for pos in arr:
        sense.set_pixel(pos[0], pos[1], color)

# Update LED matrix 
def update_matrix(doc):
    # Define device positions on matrix
    lightsPos = [(2, 0), (5, 0), (2, 4), (5, 4)]
    outletsPos = [(0, 3), (7, 3), (3, 7), (4, 7)]
    fDoorPos = [(0, 5), (0, 6), (0, 7)]
    bDoorPos = [(7, 5), (7, 6), (7, 7)]
    
    populate_pixels(lightsPos, get_color_by_device('lights', True))
    populate_pixels(outletsPos, get_color_by_device('outlets', False))
    populate_pixels(fDoorPos,  get_color_by_device('fDoor', True))
    populate_pixels(bDoorPos,  get_color_by_device('bDoor', False))


def watch_device_data():
    doc = db.collection('devices').document('lights').get()
    data = doc.to_dict()
    print(data['isActive'])

watch_device_data()
sense.clear()