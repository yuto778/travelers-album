const users = [
  {
    id: 'user1',
    name: 'ゆう',
    email: 'yuu@nextmail.com',
    password: 'password1',
    icon: '/public/icons/S__27050004.jpge',
    birthday: '1990/04/02'
  },
  {
    id: 'user2',
    name: 'すずき',
    email: 'suzuki@nextmail.com',
    password: 'password2',
    icon: '/public/icons/...',
    birthday: '2000/01/01'
  },
];

const fellow_travelers = [
  {
    id: 1,
    user_id: 'user1',
    fellow_id: 'user2'
  },
];

const tripboards_users = [
  {
    id:1,
    user_id: 'user1',
    board_id: 'trip1'
  },
];

const trip_boards = [
  {
    id: 'trip1',
    title:'1の旅行',
    startday: '2024-05-03',
    endday: '2024-05-05',
    thumbnail: '/public/images/...',
    owner_id:'user1',
    last_update: '2024-05-09T00:00:00Z'
  },
];

const trip_cards = [
  {
    id: 'card1',
    board_id: 'trip1',
    memo: '温泉気持ちよかった〜',
    thumbnail_id: 1,
    location_point: {x: 36.3564, y: 138.6178}
  },
];

const card_pictures = [
  {
    id: 'picture1',
    card_id: 'card1',
    picture: '/public/images/2832_10_l.jpg',
    photo_date: '2024-05-04'
  },  
];