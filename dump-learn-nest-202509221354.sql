--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5

-- Started on 2025-09-22 13:54:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 156390)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 874 (class 1247 OID 156459)
-- Name: article_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.article_status_enum AS ENUM (
    'SUCCESS',
    'PENDING',
    'CANCEL'
);


--
-- TOC entry 865 (class 1247 OID 156429)
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_role_enum AS ENUM (
    'user',
    'admin'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 156465)
-- Name: article; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.article (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    content text NOT NULL,
    status public.article_status_enum DEFAULT 'PENDING'::public.article_status_enum NOT NULL,
    image text NOT NULL,
    "categoryId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 156476)
-- Name: article_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.article_tag (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "tagId" uuid NOT NULL,
    "articleId" uuid NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 156410)
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 156448)
-- Name: comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" uuid NOT NULL,
    "articleId" uuid NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 156402)
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 156401)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 215
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 218 (class 1259 OID 156418)
-- Name: profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profile (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    age integer NOT NULL,
    bio text NOT NULL,
    "userId" uuid NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 156482)
-- Name: tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tag (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 156433)
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role public.user_role_enum DEFAULT 'user'::public.user_role_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 3218 (class 2604 OID 156405)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3413 (class 0 OID 156465)
-- Dependencies: 221
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.article (id, title, content, status, image, "categoryId", "userId", "createdAt", "updatedAt") FROM stdin;
4467341b-5742-4f58-b071-c880a10a5534	Title A	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum	PENDING	https://res.cloudinary.com/dj1zpaj7w/image/upload/v1757786285/articles/hfc1kxebaeuonjenszmu.jpg	fabf29f7-458d-42b6-be23-51f06f864daa	4bb894d4-66e6-4bc6-9a93-78d7c071edf3	2025-09-14 01:58:26.167668	2025-09-14 01:58:26.167668
46a7c16c-7804-4000-be06-1a7127437f35	Title B	It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).	PENDING	https://res.cloudinary.com/dj1zpaj7w/image/upload/v1757786305/articles/gj0d78q5q4hnvlczv6gj.jpg	fabf29f7-458d-42b6-be23-51f06f864daa	4bb894d4-66e6-4bc6-9a93-78d7c071edf3	2025-09-14 01:58:45.0888	2025-09-14 01:58:45.0888
4b52f34b-4357-4f1d-9000-31d164ea8d2c	Title C	There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.	PENDING	https://res.cloudinary.com/dj1zpaj7w/image/upload/v1757786313/articles/xozbwg3kcb1se9tkc8ko.jpg	fabf29f7-458d-42b6-be23-51f06f864daa	4bb894d4-66e6-4bc6-9a93-78d7c071edf3	2025-09-14 01:58:53.326747	2025-09-14 01:58:53.326747
1f52a4b5-cd7a-4a7a-a1bd-cfd2d7c06f50	Title D	Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.	PENDING	https://res.cloudinary.com/dj1zpaj7w/image/upload/v1757786342/articles/r2t7dkav3gyfzhzfnwyx.jpg	77eb811d-3b16-4a30-b050-afe4fa7df533	4bb894d4-66e6-4bc6-9a93-78d7c071edf3	2025-09-14 01:59:23.044665	2025-09-14 01:59:23.044665
aeb108e2-f446-4e02-97ad-6404e6f9a866	Title E	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	PENDING	https://res.cloudinary.com/dj1zpaj7w/image/upload/v1757786352/articles/evl1im4gzwkl0og1nnr0.jpg	77eb811d-3b16-4a30-b050-afe4fa7df533	4bb894d4-66e6-4bc6-9a93-78d7c071edf3	2025-09-14 01:59:32.19891	2025-09-14 01:59:32.19891
\.


--
-- TOC entry 3414 (class 0 OID 156476)
-- Dependencies: 222
-- Data for Name: article_tag; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.article_tag (id, "tagId", "articleId") FROM stdin;
d07e57ab-666d-4a1b-bb04-0aefde105e08	5a250cc0-8c22-4552-b355-d7af95649f6d	4467341b-5742-4f58-b071-c880a10a5534
cef06bf1-a64e-445e-9d1a-83c4c94e80ca	23788de5-6ce3-47b7-abc3-fe29d178f3fb	4467341b-5742-4f58-b071-c880a10a5534
74c27dc6-1f7a-4a9d-aa50-d710bb37b2b5	5a250cc0-8c22-4552-b355-d7af95649f6d	46a7c16c-7804-4000-be06-1a7127437f35
20ad3c31-1c11-4adc-ad74-7f5076316083	5a250cc0-8c22-4552-b355-d7af95649f6d	4b52f34b-4357-4f1d-9000-31d164ea8d2c
0f1ca91c-c36d-45aa-9c99-5c499535a2d2	5a250cc0-8c22-4552-b355-d7af95649f6d	1f52a4b5-cd7a-4a7a-a1bd-cfd2d7c06f50
c629bbcc-c3c7-4de9-a210-0bb42fe986ac	b78a738c-8fd0-4faa-96a5-2b9f1221731a	aeb108e2-f446-4e02-97ad-6404e6f9a866
\.


--
-- TOC entry 3409 (class 0 OID 156410)
-- Dependencies: 217
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.category (id, name) FROM stdin;
fabf29f7-458d-42b6-be23-51f06f864daa	Category A
77eb811d-3b16-4a30-b050-afe4fa7df533	Category B
3d27eca3-87ad-47a5-8932-e9b53530b1d4	Category C
b7f57796-049b-4c64-8e76-8e0dcc945828	Category D
e9c4c1b3-18a4-497c-9d71-3f22bb248adb	Category E
e4a9e628-e9da-4c34-ab19-5f504ca23c3e	Category F
4ba210f9-9364-4e06-ab35-9b3641a4d37f	Category G
8996cf00-db44-437f-b352-ad07a8c41fce	Category H
d4e9d01f-656b-4c77-886c-3b116584ae23	Category I
18841970-feec-459c-b7a4-055e7b26b912	Category J
\.


--
-- TOC entry 3412 (class 0 OID 156448)
-- Dependencies: 220
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comment (id, "userId", "articleId", content, "createdAt", "updatedAt") FROM stdin;
b56d73f5-7f1b-4896-9971-d01bb470bd50	4bb894d4-66e6-4bc6-9a93-78d7c071edf3	aeb108e2-f446-4e02-97ad-6404e6f9a866	Coba komen	2025-09-16 23:11:06.768532	2025-09-16 23:11:06.768532
\.


--
-- TOC entry 3408 (class 0 OID 156402)
-- Dependencies: 216
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1757641255488	InitDatabase1757641255488
\.


--
-- TOC entry 3410 (class 0 OID 156418)
-- Dependencies: 218
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.profile (id, age, bio, "userId") FROM stdin;
fefab478-2b4c-446f-9f65-e071b3dffa6d	10	my bio	4bb894d4-66e6-4bc6-9a93-78d7c071edf3
\.


--
-- TOC entry 3415 (class 0 OID 156482)
-- Dependencies: 223
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tag (id, name) FROM stdin;
5a250cc0-8c22-4552-b355-d7af95649f6d	vue js
23788de5-6ce3-47b7-abc3-fe29d178f3fb	ruby
b78a738c-8fd0-4faa-96a5-2b9f1221731a	php
\.


--
-- TOC entry 3411 (class 0 OID 156433)
-- Dependencies: 219
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, name, email, password, role, "createdAt", "updatedAt") FROM stdin;
4bb894d4-66e6-4bc6-9a93-78d7c071edf3	admin	eadminan@admin.com	$2b$10$ahxvSc.v8Tf8fVQ/rONccO67M..hkxJciAAVWHOT7Co..4xS5WsGK	admin	2025-09-14 01:56:22.45272	2025-09-14 01:56:22.45272
\.


--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 215
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- TOC entry 3249 (class 2606 OID 156457)
-- Name: comment PK_0b0e4bbc8415ec426f87f3a88e2; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 156425)
-- Name: profile PK_3dd8bfc97e4a77c70971591bdcb; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY (id);


--
-- TOC entry 3251 (class 2606 OID 156475)
-- Name: article PK_40808690eb7b915046558c0f81b; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY (id);


--
-- TOC entry 3253 (class 2606 OID 156481)
-- Name: article_tag PK_43dc2fa69a4739ce178e021d649; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_tag
    ADD CONSTRAINT "PK_43dc2fa69a4739ce178e021d649" PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 156409)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3255 (class 2606 OID 156489)
-- Name: tag PK_8e4052373c579afc1471f526760; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 156417)
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 156443)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 156427)
-- Name: profile REL_a24972ebd73b106250713dcddd; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId");


--
-- TOC entry 3245 (class 2606 OID 156445)
-- Name: user UQ_065d4d8f3b5adb4a08841eae3c8; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE (name);


--
-- TOC entry 3257 (class 2606 OID 156491)
-- Name: tag UQ_6a9775008add570dc3e5a0bab7b; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE (name);


--
-- TOC entry 3247 (class 2606 OID 156447)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 3261 (class 2606 OID 156507)
-- Name: article FK_12824e4598ee46a0992d99ba553; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "FK_12824e4598ee46a0992d99ba553" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- TOC entry 3263 (class 2606 OID 156522)
-- Name: article_tag FK_602d4921b27c9a7cb6c095992b4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_tag
    ADD CONSTRAINT "FK_602d4921b27c9a7cb6c095992b4" FOREIGN KEY ("articleId") REFERENCES public.article(id);


--
-- TOC entry 3262 (class 2606 OID 156512)
-- Name: article FK_636f17dadfea1ffb4a412296a28; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "FK_636f17dadfea1ffb4a412296a28" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 3258 (class 2606 OID 156492)
-- Name: profile FK_a24972ebd73b106250713dcddd9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 3264 (class 2606 OID 156517)
-- Name: article_tag FK_bbbd0832bdd107597b596d63f69; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_tag
    ADD CONSTRAINT "FK_bbbd0832bdd107597b596d63f69" FOREIGN KEY ("tagId") REFERENCES public.tag(id);


--
-- TOC entry 3259 (class 2606 OID 156497)
-- Name: comment FK_c0354a9a009d3bb45a08655ce3b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 3260 (class 2606 OID 156502)
-- Name: comment FK_c20404221e5c125a581a0d90c0e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_c20404221e5c125a581a0d90c0e" FOREIGN KEY ("articleId") REFERENCES public.article(id);


-- Completed on 2025-09-22 13:54:32

--
-- PostgreSQL database dump complete
--

