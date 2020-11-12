SET IDENTITY_INSERT [dbo].[Sales] ON 
GO
INSERT [dbo].[Sales] ([SaleID], [ProductName], [Quantity], [Date], [SoldBy]) VALUES (1, N'Choclate', 10, N'2020-10-21', N'Andy')
GO
INSERT [dbo].[Sales] ([SaleID], [ProductName], [Quantity], [Date], [SoldBy]) VALUES (2, N'Jam', 150, N'2020-10-20', N'Rubin')
GO
SET IDENTITY_INSERT [dbo].[Sales] OFF
GO
