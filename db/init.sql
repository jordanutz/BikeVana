drop table if exists bikevanausers;
drop table if exists bikes;
drop table if exists favorites;
drop table if exists reviews;
drop table if exists testimonies;

select * from bikevanausers
select * from bikes
select * from favorites
select * from reviews
select * from testimonies

create table bikevanausers (
  id serial primary key,
  auth0_id text not null,
  username text not null,
  email text unique not null,
  photo text unique not null
);

create table bikes (
  id serial primary key,
  name varchar(100) not null,
  details text not null,
  color varchar(100) not null,
  brand varchar(100) not null,
  category varchar(100) not null,
  price decimal not null,
  gender varchar(100) not null,
  year integer not null,
  image text not null
);

create table favorites (
  id serial primary key,
  user_id integer references newusers(id),
  bike_id integer references bikes(id),
  favorite boolean
);

create table reviews (
  id serial primary key,
  title text not null,
  description text not null,
  rating decimal,
  pros text not null,
  cons text not null,
  best_uses text not null,
  date_posted text not null,
  user_id integer references users(id),
  bike_id integer references bikes(id)
);

create table orders (
  id serial primary key,
  user_id integer references bikevanausers(id),
  paid boolean
)

create table cart (
  id serial primary key,
  order_id integer references orders(id),
  bike_id integer references bikes(id),
  quantity integer
)

insert into bikes
  (name, details, color, brand, category, price, gender, year, image)
  values
  ('Cruz 7',
  'Across campus, around town and wherever you choose to go, Sun''s Cruz 7 will get you there in style. The agile aluminum frame boasts classic lines for a cool, old-school flavor, while the steel fork smooths out the ride. And with seven speeds at your disposal, you''ll always have the perfect gear for easy climbing and descending. Plus, the springer saddle and wide, swept-back bars deliver an awesome upright position and outstanding comfort. What''s more, the Cruz comes with fenders to keep you clean and dry even when road conditions are less than ideal.',
  'Black',
  'Sun Bicycles',
  'Comfort',
  399.99,
  'Not Designated',
  2018,
  'https://www.thebikeshopaz.com/images/library/large/sun-bicycles-cruz-7-78678-1.jpg'),

  ('Traditional Trike 20',
  'Sun''s Traditional Trike features a super-low step-through frame for easy on/off and an oversized saddle for supreme comfort. Plus, this trick trike boasts a singlespeed drivetrain and 20-inch aluminum wheels for effortless pedaling, while the coaster brake and hand brake that doubles as a parking brake provide safe, confident stops. You''ll also love the large vinyl-coated basket for carrying your stuff.',
  'Blue',
  'Sun Bicycles',
  'Other',
  409.99,
  'Not Designated',
  2017,
  'https://www.thebikeshopaz.com/images/library/large/sun-bicycles-traditional-trike-20-inch-wheels-65877-1.jpg'),

  ('M.02X',
  'The Wallerang M0.2X Smartbike combines the easy to ride Step-Through design and quality RockShox air suspension to the award-winning Swedish design, taking control and comfort to even higher levels. Featuring modular cargo system and powered by the reliable Shimano STEPS system, this bike is ready to haul you and your gear effortlessly. With the electronic Shimano Alfine Di2 (featuring optional auto-shifting) you will always be in the right gear. Shimano brakes and Spanninga lights keep you safe, visible and in control on the road. Wallerang will have you re-thinking what you can do with a bicycle.',
  'White',
  'Walleräng',
  'Commuter/Urban',
  3599.00,
  'Not Designated',
  2017,
  'https://www.thebikeshopaz.com/images/library/large/wallerng-m.02x-297590-1.png'),

  ('Sirrus Sport',
  'Cruise down your favorite streets and paths in comfort and style on Specialized''s Sirrus Sport. Its lightweight aluminum frame gets up to speed quickly, while the FACT carbon fork smooths the road and handles beautifully. You''ll also love the free-rolling 700c wheels and the comfortable flat handlebars with easy-to-reach controls. Plus, from around-town errand running to full-on adventures, the Shimano/microSHIFT 18-speed drivetrain provides easy climbing while the Shimano hydraulic disc brakes deliver supreme confidence for the cruise back down.',
  'White',
  'Specialized',
  'Urban',
  689.95,
  'Not Designated',
  2017,
  'https://www.bikebarnaz.com/images/library/large/specialized-sirrus-sport-263784-11.jpg'),

  ('Teammachine SLR02 TWO',
  'The requirements for the Teammachine family were defined by the demands of WorldTour racing — a delicate balance of ultra-low weight for those grueling, above-category climbs and rapid-fire acceleration for laying down aggressive attacks. In response, BMC''s engineers outdid themselves and developed their proprietary ACE Technology. With this, they accelerated the design and engineering process and developed 34,000 virtual prototypes in just one year. The end result is the Teammachine SLR — offering the world''s finest balance of low weight, stiffness, and compliance. Right from the line, you''ll know that the Mavic wheels and Vittoria tires are the ticket to a smooth, fast ride and a whole heck of a lot of fun carving through corners. The 22-speed Shimano 105 drivetrain offers high performance and consistency with the same feather-light shifts as their elite level options, but in a wallet-friendly package. BMC cockpit components and a Fizik saddle offer a sleek, supportive perch.',
  'White',
  'BMC',
  'Sport/Performance',
  2599.00,
  'Not Designated',
  2018,
  'https://static.evanscycles.com/production/bikes/road-bikes/product-image/Original/bmc-teammachine-slr02-disc-two-2019-road-bike-carbon-EV338290-9400-1.jpg'),

  ('Cruz 3',
  'Across campus or around town, Sun''s Cruz 3 will get you there in style. The agile aluminum frame boasts classic lines for a cool, old-school flavor. And, the 3-speed rear hub lets you pick the perfect gear, whether you''re racing to get to class or work, or just climbing the hill back home. Plus, the springer saddle and wide, swept-back bars deliver an awesome upright position, while the fenders keep you clean and dry even when road conditions are less than ideal.',
  'Pink',
  'Sun Bicycles',
  'Comfort',
  429.99,
  'Women''s',
  2018,
  'https://www.thebikeshopaz.com/images/library/zoom/sun-bicycles-womens-cruz-3-159151-1.jpg'),

  ('Roadmachine 03 ONE',
  'Who said you couldn''t have it all? Due to the ultimate advancements in a re-Tuned Compliance Concept, this bike challenges the traditional road bike categories. From axle to axle, the aluminum Roadmachine 03 delivers sleek, integrated technologies and hints at free speed from every angle. It is lightweight, fast, and incredibly integrated. Brilliant pedaling efficiency and the ideal level of compliance for legendary days of riding leave you with no doubts; this bike has it all. The 22-speed Shimano 105 drivetrain adds even more value, with smooth, predictable shifts, while Shimano hydraulic disc brakes perform reliably no matter the conditions. The light and strong Mavic wheels with durable 28mm Vittoria tires are exactly what you need to tackle long climbs and twisting descents with confidence.',
  'Black',
  'BMC',
  'Sport/Performance, Road',
  2199.00,
  'Not Designated',
  2018,
  'https://static.evanscycles.com/production/bikes/road-bikes/product-image/484-319/bmc-roadmachine-03-one-2018-hybrid-bike-black-red-EV302711-8530-1.jpg'),

  ('Roadmachine 03 THREE',
  'Who said you couldn’t have it all? Due to the ultimate advancements in a re-Tuned Compliance Concept, this bike challenges the traditional road bike categories. From axle to axle, the aluminum Roadmachine 03 delivers sleek, integrated technologies and hints at free speed from every angle. It''s lightweight, fast, and incredibly integrated. Brilliant pedaling efficiency and the ideal level of compliance for legendary days of riding leave you with no doubts; this bike has it all. The 11-speed SRAM Apex1 drivetrain brings streamlined and quiet shifting to your ride while the light Novatec wheels and grippy Vittoria tires are just what the doctor ordered for long climbs and twisting descents. ',
  'Bronze',
  'BMC',
  'Sport/Performance, Road',
  1799.00,
  'Not Designated',
  2018,
  'https://static.cyclelab.eu/velos/bmc/2007/highres/Roadmachine-03_THREE_brz-ora-bwn.jpg'),

  ('Roadmachine 03 TWO',
  'Who said you couldn’t have it all? Due to the ultimate advancements in a re-Tuned Compliance Concept, this bike challenges the traditional road bike categories. From axle to axle, the aluminum Roadmachine 03 delivers sleek, integrated technologies and hints at free speed from every angle. It''s lightweight, fast, and incredibly integrated. Brilliant pedaling efficiency and the ideal level of compliance for legendary days of riding leave you with no doubts; this bike has it all. The 20-speed Shimano Tiagra drivetrain takes care of business with Shimano''s trademark reliability, and the lightweight Novatec wheels and road-gripping Vittoria tires are your ticket to cornering bliss. ',
  'Blue',
  'BMC',
  'Sport/Performance, Road',
  1899.00,
  'Not Designated',
  2018,
  'http://fahrrad-store.ch/public/file/image/product_item/5970991c8aef4/gall_img/5970991c8a859.jpg'),

  ('Teammachine ALR01 TWO',
  'BMC''s Teammachine ALR01 combines efficiency, low weight, and clean aesthetics for a well-rounded bike that climbs as happily as it sprints for the the town line. This 1295-gram frame is crafted from triple-butted aluminum and equipped with a full carbon fork that delivers the perfect balance of explosive acceleration with long-ride compliance. You''ll also get precision cornering and confident descending worthy of the Teammachine name. Key frame tech includes a tapered steerer for excellent handling and rear dropouts that use sandwich construction with a CNC hanger to increase stiffness and improve shifting. The Teammachine ALR01 TWO build gives you 2 x 11-speed Shimano 105 gearing, Shimano wheels, Conti tires, and BMC controls.',
  'Red',
  'BMC',
  'Sport/Performance, Road',
  1599.00,
  'Not Designated',
  2018,
  'https://www.folsombike.com/images/library/zoom/bmc-teammachine-alr01-ultegra-copy-239346-1.jpg')
