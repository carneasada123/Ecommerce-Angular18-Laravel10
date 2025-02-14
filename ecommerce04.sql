PGDMP  .                    |            ecommerce04    16.1    16.1 H    D           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            E           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            F           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            G           1262    50081    ecommerce04    DATABASE     �   CREATE DATABASE ecommerce04 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Latin America.utf8';
    DROP DATABASE ecommerce04;
                postgres    false            �            1259    50164    carrito    TABLE     &  CREATE TABLE public.carrito (
    id bigint NOT NULL,
    usuarios_id bigint NOT NULL,
    producto_id bigint NOT NULL,
    cantidad integer NOT NULL,
    categoria character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.carrito;
       public         heap    postgres    false            �            1259    50163    carrito_id_seq    SEQUENCE     w   CREATE SEQUENCE public.carrito_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.carrito_id_seq;
       public          postgres    false    229            H           0    0    carrito_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.carrito_id_seq OWNED BY public.carrito.id;
          public          postgres    false    228            �            1259    50109    failed_jobs    TABLE     &  CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.failed_jobs;
       public         heap    postgres    false            �            1259    50108    failed_jobs_id_seq    SEQUENCE     {   CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.failed_jobs_id_seq;
       public          postgres    false    221            I           0    0    failed_jobs_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;
          public          postgres    false    220            �            1259    50083 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    postgres    false            �            1259    50082    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    216            J           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    215            �            1259    50102    password_resets    TABLE     �   CREATE TABLE public.password_resets (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);
 #   DROP TABLE public.password_resets;
       public         heap    postgres    false            �            1259    50181    pedido_producto    TABLE     �   CREATE TABLE public.pedido_producto (
    id bigint NOT NULL,
    pedido_id bigint NOT NULL,
    producto_id bigint NOT NULL,
    cantidad integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 #   DROP TABLE public.pedido_producto;
       public         heap    postgres    false            �            1259    50180    pedido_producto_id_seq    SEQUENCE        CREATE SEQUENCE public.pedido_producto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.pedido_producto_id_seq;
       public          postgres    false    231            K           0    0    pedido_producto_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.pedido_producto_id_seq OWNED BY public.pedido_producto.id;
          public          postgres    false    230            �            1259    50144    pedidos    TABLE     Q  CREATE TABLE public.pedidos (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    tipo_pago character varying(255) NOT NULL,
    estado character varying(255) DEFAULT 'en proceso'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    fecha_entrega date
);
    DROP TABLE public.pedidos;
       public         heap    postgres    false            �            1259    50143    pedidos_id_seq    SEQUENCE     w   CREATE SEQUENCE public.pedidos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pedidos_id_seq;
       public          postgres    false    227            L           0    0    pedidos_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;
          public          postgres    false    226            �            1259    50121    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 *   DROP TABLE public.personal_access_tokens;
       public         heap    postgres    false            �            1259    50120    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public          postgres    false    223            M           0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public          postgres    false    222            �            1259    50133 	   productos    TABLE     �  CREATE TABLE public.productos (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text NOT NULL,
    precio numeric(8,2) NOT NULL,
    cantidad integer NOT NULL,
    categoria character varying(255) NOT NULL,
    oferta boolean DEFAULT false NOT NULL,
    foto character varying(255),
    estado boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    codigo character varying(255)
);
    DROP TABLE public.productos;
       public         heap    postgres    false            �            1259    50132    productos_id_seq    SEQUENCE     y   CREATE SEQUENCE public.productos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.productos_id_seq;
       public          postgres    false    225            N           0    0    productos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;
          public          postgres    false    224            �            1259    50090    usuarios    TABLE       CREATE TABLE public.usuarios (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    direccion character varying(255),
    telefono character varying(255),
    celular character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(255) DEFAULT 'cliente'::character varying NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    50089    usuarios_id_seq    SEQUENCE     x   CREATE SEQUENCE public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    218            O           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    217            �           2604    50167 
   carrito id    DEFAULT     h   ALTER TABLE ONLY public.carrito ALTER COLUMN id SET DEFAULT nextval('public.carrito_id_seq'::regclass);
 9   ALTER TABLE public.carrito ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    229    229            {           2604    50112    failed_jobs id    DEFAULT     p   ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);
 =   ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            w           2604    50086    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    50184    pedido_producto id    DEFAULT     x   ALTER TABLE ONLY public.pedido_producto ALTER COLUMN id SET DEFAULT nextval('public.pedido_producto_id_seq'::regclass);
 A   ALTER TABLE public.pedido_producto ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230    231            �           2604    50147 
   pedidos id    DEFAULT     h   ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);
 9   ALTER TABLE public.pedidos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226    227            }           2604    50124    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            ~           2604    50136    productos id    DEFAULT     l   ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);
 ;   ALTER TABLE public.productos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            x           2604    50093    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            ?          0    50164    carrito 
   TABLE DATA           l   COPY public.carrito (id, usuarios_id, producto_id, cantidad, categoria, created_at, updated_at) FROM stdin;
    public          postgres    false    229   &Y       7          0    50109    failed_jobs 
   TABLE DATA           a   COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
    public          postgres    false    221   kY       2          0    50083 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public          postgres    false    216   �Y       5          0    50102    password_resets 
   TABLE DATA           C   COPY public.password_resets (email, token, created_at) FROM stdin;
    public          postgres    false    219   �Z       A          0    50181    pedido_producto 
   TABLE DATA           g   COPY public.pedido_producto (id, pedido_id, producto_id, cantidad, created_at, updated_at) FROM stdin;
    public          postgres    false    231   �Z       =          0    50144    pedidos 
   TABLE DATA           k   COPY public.pedidos (id, usuario_id, tipo_pago, estado, created_at, updated_at, fecha_entrega) FROM stdin;
    public          postgres    false    227   �Z       9          0    50121    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, created_at, updated_at) FROM stdin;
    public          postgres    false    223   �[       ;          0    50133 	   productos 
   TABLE DATA           �   COPY public.productos (id, nombre, descripcion, precio, cantidad, categoria, oferta, foto, estado, created_at, updated_at, codigo) FROM stdin;
    public          postgres    false    225   \_       4          0    50090    usuarios 
   TABLE DATA           �   COPY public.usuarios (id, nombre, direccion, telefono, celular, email, password, rol, estado, created_at, updated_at) FROM stdin;
    public          postgres    false    218   �a       P           0    0    carrito_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.carrito_id_seq', 6, true);
          public          postgres    false    228            Q           0    0    failed_jobs_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);
          public          postgres    false    220            R           0    0    migrations_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.migrations_id_seq', 12, true);
          public          postgres    false    215            S           0    0    pedido_producto_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.pedido_producto_id_seq', 5, true);
          public          postgres    false    230            T           0    0    pedidos_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.pedidos_id_seq', 5, true);
          public          postgres    false    226            U           0    0    personal_access_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 16, true);
          public          postgres    false    222            V           0    0    productos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.productos_id_seq', 7, true);
          public          postgres    false    224            W           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 5, true);
          public          postgres    false    217            �           2606    50169    carrito carrito_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.carrito DROP CONSTRAINT carrito_pkey;
       public            postgres    false    229            �           2606    50117    failed_jobs failed_jobs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_pkey;
       public            postgres    false    221            �           2606    50119 #   failed_jobs failed_jobs_uuid_unique 
   CONSTRAINT     ^   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);
 M   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_uuid_unique;
       public            postgres    false    221            �           2606    50088    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public            postgres    false    216            �           2606    50186 $   pedido_producto pedido_producto_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.pedido_producto
    ADD CONSTRAINT pedido_producto_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.pedido_producto DROP CONSTRAINT pedido_producto_pkey;
       public            postgres    false    231            �           2606    50152    pedidos pedidos_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_pkey;
       public            postgres    false    227            �           2606    50128 2   personal_access_tokens personal_access_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
       public            postgres    false    223            �           2606    50131 :   personal_access_tokens personal_access_tokens_token_unique 
   CONSTRAINT     v   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);
 d   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_unique;
       public            postgres    false    223            �           2606    50142    productos productos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            postgres    false    225            �           2606    50101    usuarios usuarios_email_unique 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_unique UNIQUE (email);
 H   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_unique;
       public            postgres    false    218            �           2606    50099    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    218            �           1259    50107    password_resets_email_index    INDEX     X   CREATE INDEX password_resets_email_index ON public.password_resets USING btree (email);
 /   DROP INDEX public.password_resets_email_index;
       public            postgres    false    219            �           1259    50129 8   personal_access_tokens_tokenable_type_tokenable_id_index    INDEX     �   CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);
 L   DROP INDEX public.personal_access_tokens_tokenable_type_tokenable_id_index;
       public            postgres    false    223    223            �           2606    50175 #   carrito carrito_producto_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_producto_id_foreign FOREIGN KEY (producto_id) REFERENCES public.productos(id) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.carrito DROP CONSTRAINT carrito_producto_id_foreign;
       public          postgres    false    225    229    4758            �           2606    50170 #   carrito carrito_usuarios_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_usuarios_id_foreign FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.carrito DROP CONSTRAINT carrito_usuarios_id_foreign;
       public          postgres    false    218    229    4746            �           2606    50187 1   pedido_producto pedido_producto_pedido_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedido_producto
    ADD CONSTRAINT pedido_producto_pedido_id_foreign FOREIGN KEY (pedido_id) REFERENCES public.pedidos(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.pedido_producto DROP CONSTRAINT pedido_producto_pedido_id_foreign;
       public          postgres    false    4760    231    227            �           2606    50192 3   pedido_producto pedido_producto_producto_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedido_producto
    ADD CONSTRAINT pedido_producto_producto_id_foreign FOREIGN KEY (producto_id) REFERENCES public.productos(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.pedido_producto DROP CONSTRAINT pedido_producto_producto_id_foreign;
       public          postgres    false    225    4758    231            �           2606    50153 "   pedidos pedidos_usuario_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_usuario_id_foreign;
       public          postgres    false    4746    218    227            ?   5   x�3�4�4�4�LJ-I-*O-J�4202�5��52Q00�22�25�&����� ���      7      x������ � �      2     x�]�[r�0E��b:~`{�F�J�����ۯ0��9��B^��5HR����0�"�	�w��JAY�O����"�]�Y�At���r��N��u������[o�'�ZK��C�n6;-(~�Q�f��{��#�͙5'���f�]I^_s�h8��ލ�G��S��� ���[�Xa\�\��P%Ah-u�W���1Y��tꆋ�sp#��@Sʛ�ލvS�ѽ���=���ȃ��!U����fqJ����??���!�§      5      x������ � �      A   .   x�3�4�4�? �2�4�L�<cNc$9�8�g
d�y1z\\\ �9\      =   �   x�u�Q
�0@��S���m6�Cx����jatÉ���RV�O ��j��*�
�Y�ۢ�¹5����c�C6^�͂gi�?bK�,�^yƩ~�z�~wݱͬ$!iR��xI>̲���`l���[�J�5��4��[��V�=[�%�h
#=���-�N�      9   �  x���͎\E��s�e�������?�@$"��q�,&�w2˶��_��*|�����������ǟ?|̿�����~z����a-W��[P�s� Qp��6o��1WZ��U�2[���7߾�����-��$߀��'��58�����1���4S�0ilb���Kl{pn�ְ�#��3�11N��來q�w�5�<�4����Α6�t z}���Z��9}�c��6�䵵]P�I~>�ɩw�[߁/`>�������RF���֜[��� �3q�^�C��/RQL���U߁�:f��w)ӥ�hi9�,w�5c�i�����ԙ\Z��_�Y�'��]��w����2x˜l��\�-}��xE�>:��3ǎ��d-G��+�\��Ty^Ó����
-�a,��5BD��8N͚��?x���� ��I��(:����c��)��rJ��;�u�D[ԁ�\��V�\�%l��u����&�4ZFC�w���
�ה|�s��pGy�;�+0��5�O�ā��V�J��P>�>*6G�lh��4햵�4_X�8I���9槾ï)�	eͱ�t��̽� &��T.��Xce�AU[�(V�Z��񚲄�,ű�'�E��h_�eF#�$�b�j�7���������%,��Mh[���u�{��!~gh����w��S�:vj;��N%��`P%b�2%�#jA�2�ĈT��HЮ�(� �ځ�:U뉁49�BhMk�K5�ܸq.�Y�R�
��/��J�9|���¯�]ld [=#�С}I]��m��뙰Vs����7O�j	�����_��3ív�5?�[������kv�R7E�Y��͞��si'�0���ik%R��b��?��d)o���s�w����Ƙ�F4�nv ��2��i�%���[H�VKimo��O�x��vW����8�󪖷      ;     x����r�0 ��x
^ �$Vq�3����E���"�`�h����$m�ɡ���a��'WAZR��\�i`}���۴�kʩ�^��RΨ�Ô�
�48���,hyU����_�Xs����c��=Q^�J�*���>W��w��Gu�^��wмêuaKS�}Sӱ��+�������D3���ζ��a�u»_��y̚���0U����������U'@�>�/]5�����Ɉ�&�4�������R-��w�
&��4��<���d�Ъp�_\�*N���ֆx6^GE������:�e���_\�lHæt۲
�����}Z~ª�/�Tೖ�q�G��q��/t��&-��rES"߅M��\Mt=�ɨc~���Y��O���H:pX|)^������A�ࢩ��<j�(�6���B�V��Xۛ�;z�;�����Ӏ閪X6�$X2@�wa�呟嬋@s;5a������j���I1{��d��f��x���	Z�'��Y��ِ�Xд2�D~!�D�ב$I?Y�[4      4   �  x�u�͒�0���)X��NB���(��R(�S����($�]�Z��b�NW�L7��Eu�:'��IP�Ju svU��
z�Ē��zj'͹ �����߶9噖��p�B���QE&�ٞ����Q��+JWj=��Kwr�n�x��ke��v���>6\ ������D����ܤ):(h"A*E��3��nj�#�A�d2���UL���b��d����e-ϋM���y����%�ewg�p?tA�q&.����A�IS�?K\�eL�B
��%R-l�������}�y\���L��O~��ҋ��(�~�,ҭv�_{�<�hMb��mFF���c�&M�`���O�R�뷼���g�l~\/'�;>];0��W��[�v6�}��Ɖ�2G�ls����KR����P��?���[�\VT�۰2�)��I���#̀�v�{�7�c,���X0����MOAW�{�Sj]R��,ǰo4M��CS�7���Q     