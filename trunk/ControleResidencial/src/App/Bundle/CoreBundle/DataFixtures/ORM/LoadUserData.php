  {  
                         b r e a k ;  
                 }  
                                        
                 v a r   i W i d t h   =   G e t B C B T e x t P a d d e d W i d t h (   i   ) ;  
                  
                 g _ s v B C B T e x t s [ i ] . w i d t h   =   i W i d t h ;  
                 g _ B C B T e x t s [ i ] . w i d t h   =   g _ B C B T e x t s [ i ] . t e x t w i d t h ;  
                                  
                 B C B W i d t h   + =   i W i d t h ;  
                 i f (   g _ A r r o w s E n a b l e d [ i ]   )  
                 {  
                         s v B C B S c h e m a S e l e c t o r . w i d t h   =   i A r r o w W i d t h ;  
                         B C B W i d t h   + =   i A r r o w W i d t h ;  
                 }  
           }  
           S e t B C B W i d t h (   B C B W i d t h   ) ;  
            
           H a n d l e O v e r f l o w ( ) ;  
            
 }  
  
  
  
  
 f u n c t i o n   H a n d l e O v e r f l o w ( )  
 {        
         i f (   h e l p e r . i s B i d i   )  
         {  
                 g _ m a x W i d t h   =   s v N a v i g a t i o n . l e f t   -   b a s k e t T a b P l a y _ b a c k g r o u n d . r i g h t   -   g _ k D i s t a n c e F r o m T a b s   -   g _ k D i s t a n c e F r o m N a v ;  
         }  
         e l s e  
         {  
                 g _ m a x W i d t h   =   b a s k e t T a b P l a y _ b a c k g r o u n d . l e f t   -   s v B r e a d c r u m b B a r . l e f t   -   g _ k D i s t a n c e F r o m T a b s ;  
         }  
         v a r   i A r r o w B u t t o n W i d t h   =   g _ A r r o w B u t t o n W i d t h ;  
          
         / /   S c a n   f r o m   l a s t   B C B   e l e m e n t   t o   d e t e r m i n e   h o w   m a n y   b u t t o n s   s h o u l d   b e   v i s i b l e .  
         v a r   b c b L e n g t h   =   a p p . b r e a d c r u m b I t e m C o u n t   -   1 ;  
         v a r   t o t a l B a r L e n g t h   =   i A r r o w B u t t o n W i d t h ;  
          
         g _ f i r s t V i s i b l e E l e m e n t   =   g _ k M a x B C B E l e m e n t C o u n t   +   1 ;  
          
         v a r   e l e m e n t W i d t h   =   0 ;  
         f o r (   v a r   i   =   ( b c b L e n g t h   -   g _ i F o r c e O v e r f l o w O f f s e t ) ;   i   > =   0 ;   i - -   )  
         {  
                 e l e m e n t W i d t h   =   g _ A r r o w s E n a b l e d [ i ]   ?   i A r r o w B u t t o n W i d t h   :   0 ;  
                 e l e m e n t W i d t h   + =   g _ s v B C B T e x t s [ i ] . w i d t h ;  
                 t o t a l B a r L e n g t h   + =   e l e m e n t W i d t h ;  
                  
                 i f (   (   g _ m a x W i d t h   -   t o t a l B a r L e n g t h   )   >   0   )    
                 {  
                         / /   C a n   a d d   t h i s   p a r t i c u l a r   e l e m e n t .  
                         g _ f i r s t V i s i b l e E l e m e n t   =   i ;  
                 }  
                 e l s e  
                 {  
                         S e t B C B W i d t h (   t o t a l B a r L e n g t h   -   e l e m e n t W i d t h   ) ;  
                         b r e a k ;  
                 }  
         }  
          
         / /   I f   n o   b u t t o n   i s   v i s i b l e ,   m a n u a l l y   s e t   w i d t h   o f   l a s t   v i s i b l e   b u t t o n   s o   t h a t   t h e   t e x t   i s   e l l i p s i s e d .  
         i f (   g _ f i r s t V i s i b l e E l e m e n t   = =   ( g _ k M a x B C B E l e m e n t C o u n t   +   1 )   )  
         {  
                 g _ f i r s t V i s i b l e E l e m e n t   =   b c b L e n g t h ;  
                 g _ f F o r c e E l e m e n t W i d t h   =   t r u e ;              
                 S e t B C B W i d t h (   g _ m a x W i d t h   ) ;  
                  
                 v a r   s v W i d t h   =   g _ m a x W i d t h   -   i A r r o w B u t t o n W i d t h ;  
                 g _ s v B C B T e x t s [ b c b L e n g t h ] . w i d t h   =   s v W i d t h ;  
                 g _ B C B T e x t s [ b c b L e n g t h ] . w i d t h   =   s v W i d t h   -   ( 2   *   g _ k B C B T e x t H o r i z o n t a l P a d d i n g ) ;  
  
         }  
  
          
         i f (   ( g _ i F o r c e O v e r f l o w O f f s e t   ! =   0 )   | |   ( g _ f i r s t V i s i b l e E l e m e n t   ! =   0 )   )  
         {  
                 / /   T h e   B C B   h a s   o v e r f l o w e d .  
                 g _ f B C B O v e r f l o w   =   t r u e ;    
                 / /   S h o w   t h e   o v e r f l o w   c h e v r o n .        
                 a r r o w B C B S c h e m a S e l e c t o r . b a c k g r o u n d I m a g e   =   g _ I m g O v e r f l o w ;  
                 m e n u b t n B C B S c h e m a S e l e c t o r . a c c N a m e = " r e s : / / w m p l o c / R T _ S T R I N G / # 2 2 6 2 "  
         }  
         e l s e  
         {  
                 g _ f B C B O v e r f l o w   =   f a l s e ;  
                 / /   S h o w   t h e   s c h e m a   s e l e c t o r .  
                 a r r o w B C B S c h e m a S e l e c t o r . b a c k g r o u n d I m a g e   =   g _ I m g A r r o w ;  
                 m e n u b t n B C B S c h e m a S e l e c t o r . a c c N a m e = " r e s : / / w m p l o c / R T _ S T R I N G / # 2 2 6 1 "  
         }      
 }  
  
 f u n c t i o n   S e t B C B W i d t h (   w i d t h   )  
 {  
         s v B r e a d c r u m b B a r . w i d t h   =   w i d t h ;  
         s v B r e a d c r u m b B a r . w i d t h + + ;  
         s v B r e a d c r u m b B a r . w i d t h - - ;  
          
         i f (   h e l p e r . i s B i d i   )  
         {  
                 s v B r e a d c r u m b B a r . l e f t   =   s v N a v i g a t i o n . l e f t   -   g _ k D i s t a n c e F r o m N a v   -   w i d t h ;  
         }  
 }  
   �     i d   t a s k b a r   =  a u t h o r   M i c r o s o f t   C o r p o r a t i o n      c o p y r i g h t   ( C )   M i c r o s o f t   C o r p o r a t i o n .   A l l   r i g h t s   r e s e r v e d .     @   �  # F F 0 0 F F    �  # F F 0 0 F F    �  b l a c k   Y  s c r i p t F i l e   r e s : / / w m p l o c / R T _ T E X T / t a s k b a r . j s    �      �  �   	 	    	 	    7 �o n L o a d   v w P l a y e r _ O n L o a d ( ) ;   ) �o n t i m e r   O n T i m e r ( ) ;    		      � �o n M o u s e O v e r   i f ( p l a y e r . o p e n S t a t e   = =   1 3 ) { D e s k b a n d . O n M e d i a C h a n g e ( ) ; }     �o n m o u s e u p   i f (   e v e n t . b u t t o n   = =   2   )   {   D e s k b a n d . O n C o n t e x t M e n u ( ) ;   }     �   ? �  r e s : / / w m p l o c / R T _ I M A G E / # 2 1 7 4   = H     	  m e d i a c e n t e r . b a c k H u e S h i f t   A H    	  m e d i a c e n t e r . b a c k S a t u r a t i o n    �  # F F 0 0 F F     �  b l a c k   �     P L A Y E R   o  o p e n s t a t e c h a n g e   v w P l a y e r _ O n O p e n S t a t e C h a n g e ( N e w S t a t e ) ;      p l a y s t a t e c h a n g e   v w P l a y e r _ O n P l a y S t a t e C h a n g e ( N e w S t a t e ) ;   �     P L A Y E R A P P L I C A T I O N     �h a s D i s p l a y _ o n c h a n g e   i f ( ! h a s D i s p l a y )   { D e s k b a n d . S h o w P o p u p W i n d o w ( 0 ) ;   b t n F l y O u t . d o w n = 0 ; }   ��	  1h;��%��A �On��? �  r e s : / / w m p l o c / R T _ I M A G E / # 2 0 3 3   - �  r e s : / / w m p l o c / # 2 0 3 4   ? �  r e s : / / w m p l o c / R T _ I M A G E / # 2 0 3 6   ? �  r e s : / / w m p l o c / R T _ I M A G E / # 2 0 3 7   ? �  r e s : / / w m p l o c / R T _ I M A G E / # 2 0 3 5    �  s y s t e m   = H    �  m e d i a c e n t e r . b a c k H u e S h i f t   A H    �  m e d i a c e n t e r . b a c k S a t u r a t i o n     �  T r a n s p o r t B u t t o n G r o u p   �    B U T T O N E L E M E N T    �  # 0 0 F F 0 0   G (�  w m p e n a b l e d : p l a y e r . c o n t r o l s . P l a y    �    C �o n C l i c k   p l a y e r . c o n t r o l s . P l a y ( ) ;    �  C    �  E  �    B U T T O N E L E M E N T    �  # F F 0 0 0 0   G (�  w m p e n a b l e d : p l a y e r . c o n t r o l s . S t o p    �  
  C �o n C l i c k   p l a y e r . c o n t r o l s . S t o p ( ) ;    �  F    �  G  �    B U T T O N E L E M E N T    �  # F F F F 0 0   O (�  w m p e n a b l e d : p l a y e r . c o n t r o l s . P r e v i o u s    �    K �o n C l i c k   p l a y e r . c o n t r o l s . P r e v i o u s ( ) ;    �  N    �  O  �    B U T T O N E L E M E N T    �  # 0 0 F F F F   G (�  w m p e n a b l e d : p l a y e r . c o n t r o l s . N e x t    �    C �o n c l i c k   p l a y e r . c o n t r o l s . N e x t ( ) ;    �  L    �  M  �    B U T T O N E L E M E N T    �  # 0 0 0 0 F F   	 �  �� �     �    5 H    �  p l a y e r . s e t t i n g s . m u t e   I �o n C l i c k   p l a y e r . s e t t i n g s . m u t e = d o w n ;    �  R    �  B  �    B U T T O N E L E M E N T    �  # E C 0 0 8 C    �  �   �      �o n c l i