import { config } from 'dotenv';

config();

let PORT: string;
let JWT_PRIVATE_KEY: string;

switch (process.env.NODE_ENV) {
	case 'production':
		PORT = process.env.PORT!;
		JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY!;
		break;

	case 'development':
		PORT = process.env.PORT_DEV!;
		JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY_DEV!;
		break;

	case 'test':
		PORT = process.env.PORT_TEST!;
		JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY_TEST!;
		break;

	default:
		PORT = process.env.PORT_DEV!;
		JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY_DEV!;
		break;
}

export { PORT, JWT_PRIVATE_KEY };
