DROP PROCEDURE IF EXISTS getColumn;
DELIMITER //
-- ********************************************************************************************
-- getColumn カラム名一覧を取得する
--
-- 【処理概要】
--  カラム名一覧を取得する
--
--
-- 【呼び出し元画面】
--   リスト
--
-- 【引数】
--      _tableName     : テーブル名
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.8.22 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `getColumn`(
    IN `_tableName` VARCHAR(100)
    , OUT `exit_cd` INTEGER
)
COMMENT 'カラム名一覧取得'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
        show columns from ",_tableName,";
    ");

    SET @query_text = @query;

        -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SET exit_cd = 0;

END
//
DELIMITER ;
