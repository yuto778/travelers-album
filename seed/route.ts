//このファイルでは各テーブルの定義をして別のファイルで使えるようにしています
import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, fellow_travelers, tripboards_users, trip_boards, trip_cards, card_pictures} from '../lib/placeholder-data';

const client = await db.connect();

//Usersテーブルの定義
async function seedUsers() {
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(50) NOT NULL, 
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        icon TEXT NOT NULL,
        birthday TEXT NOT NULL
      );
    `;
  
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, email, password, icon, birthday)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.icon}, ${user.birthday})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );
  
    return insertedUsers;
}

//fellow_travelersの定義
async function seedFellow_travelers() {
    await client.sql`
      CREATE TABLE IF NOT EXISTS fellow_travelers (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL,
        fellow_id VARCHAR(50) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (fellow_id) REFERENCES user(id)
      );
    `;
  
    const insertedFellow_travelers = await Promise.all(
      fellow_travelers.map(
        (fellow_travelers) => client.sql`
          INSERT INTO fellow_travelers (id, user_id, fellow_id)
          VALUES (${fellow_travelers.id}, ${fellow_travelers.user_id}, ${fellow_travelers.fellow_id})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );
  
    return insertedFellow_travelers;
}

//seedTripboards_Usersの定義
async function seedTripboards_Users() {
    await client.sql`
      CREATE TABLE IF NOT EXISTS tripboards_users (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL,
        board_id VARCHAR(50) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (board_id) REFERENCES trip_boards(id)
      );
    `;
  
    const insertedTripboards_Users = await Promise.all(
        tripboards_users.map(
        (tripboards_users) => client.sql`
          INSERT INTO tripboards_users (id, user_id, board_id)
          VALUES (${tripboards_users.id}, ${tripboards_users.user_id}, ${tripboards_users.board_id})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );
  
    return insertedTripboards_Users;
}

//seedTrip_boardsの定義
async function seedTrip_boards() {
    await client.sql`
      CREATE TABLE IF NOT EXISTS trip_boards (
        id TEXT PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        startday DATE NOT NULL,
        endday DATE, 
        thumbnail TEXT NOT NULL,
        owner_id CHAR(3),
        last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;
  
    const insertedTrip_boards = await Promise.all(
        trip_boards.map(
        (trip_boards) => client.sql`
          INSERT INTO trip_boards (id, title, startday, endday, thumbnail, owner_id, last_update)
          VALUES (${trip_boards.id}, 
                  ${trip_boards.title},
                  ${trip_boards.startday},
                  ${trip_boards.endday},
                  ${trip_boards.thumbnail},
                  ${trip_boards.owner_id},
                  ${trip_boards.last_update})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );
  
    return insertedTrip_boards;
}

//seedTrip_cardsの定義
async function seedTrip_cards() {
    await client.sql`
      CREATE TABLE IF NOT EXISTS trip_cards (
        id TEXT PRIMARY KEY,
        board_id TEXT NOT NULL,
        memo TEXT,
        thumbnail_id SERIAL,
        location_pointx,
        location_pointy,
        FOREIGN KEY (board_id) REFERENCES trip_boards(id)
      );
    `;
  
    const insertedTrip_cards = await Promise.all(
        trip_cards.map(
        (trip_cards) => client.sql`
          INSERT INTO trip_cards (id, board_id, memo, thumbnail_id, location_pointx, location_pointy)
          VALUES (${trip_cards.id},
                  ${trip_cards.board_id},
                  ${trip_cards.memo},
                  ${trip_cards.thumbnail_id},
                  ${trip_cards.location_pointx},
                  ${trip_cards.location_pointy}
                 )
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );
  
    return insertedTrip_cards;
}

//seedCard_picturesの定義
async function seedCard_pictures() {
    await client.sql`
      CREATE TABLE IF NOT EXISTS card_pictures (
        id TEXT PRIMARY KEY,
        card_id TEXT NOT NULL,
        picture TEXT,
        photo_date DATE,
        FOREIGN KEY (card_id) REFERENCES trip_cards(id)
      );
    `;
  
    const insertedCard_pictures = await Promise.all(
        card_pictures.map(
        (card_pictures) => client.sql`
          INSERT INTO card_pictures (id, card_id, picture, photo_date)
          VALUES (${card_pictures.id}, ${card_pictures.card_id}, ${card_pictures.picture},${card_pictures.photo_date})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );
  
    return insertedCard_pictures;
}

//データベースにシードするスクリプト
export async function GET() {
  try {
      await client.sql`BEGIN`;
      await seedUsers();
      await seedFellow_travelers();
      await seedTripboards_Users();
      await seedTrip_boards();
      await seedTrip_cards();
      await seedCard_pictures();
      await client.sql`COMMIT`;

      return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
  }
}