export type FormFieldError = {
	message: string;
};

export type FormErrors<T> = {
	[K in keyof T]?: string;
};
